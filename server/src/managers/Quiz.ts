import { CHANGE_PROBLEM, END_QUIZ } from "../messages";
import { getRandomId } from "../utils/getRandomString";
import { IoManager } from "./IoManager";

const PROBLEM_TIME_S = 20;

interface User {
  name: string;
  id: string;
  points: number;
}

export type allowedSubmissions = 1 | 2 | 3 | 4;

interface Submission {
  problemId: string;
  userId: string;
  isCorrect: boolean;
  optionSelected: allowedSubmissions;
}

interface Problem {
  id: string;
  title: string;
  description: string;
  image: string;
  answer: allowedSubmissions;
  option: {
    id: number;
    title: string;
  };
  submissions: Submission[];
  startTime: number;
}
export class Quiz {
  public roomId: string;
  private hasStarted: boolean;
  private problems: Problem[];
  private activeProblem: number;
  private users: User[];
  private currentState : "leaderboard" | "question" | "not_started" | "is_ended";  
 
  constructor(roomId: string) {
    this.hasStarted = false;
    this.problems = [];
    this.activeProblem = 0;
    this.users = [];
    this.roomId = getRandomId(8);
    this.currentState = "not_started";
  }

  start() {
    this.hasStarted = true;
    const io = IoManager.getIo();
    io.emit(CHANGE_PROBLEM, {
      problem: this.problems[0],
    });
    this.setActiveProblem(this.problems[0]);
  }

  setActiveProblem(problem : Problem){
      problem.startTime = new Date().getTime()
      problem.submissions = [];
      IoManager.getIo().emit(CHANGE_PROBLEM, {
        problem,
      });
      setTimeout(() => {
        this.sendLeaderBoard();
      }, PROBLEM_TIME_S * 1000);
      
    }
  sendLeaderBoard(){
    const leaderBoard = this.getLeaderBoard();
    IoManager.getIo().to(this.roomId).emit("leaderboard",{
      leaderBoard
    });
  }
   addProblem(problem: Problem) {
    this.problems.push(problem);
  }

  private next() {
    this.activeProblem++;
    const problem = this.problems[this.activeProblem];
    if (problem) {
        this.setActiveProblem(problem);
    } else {
      // IoManager.getIo().emit(END_QUIZ);
    }
  }
  addUser(name: string) {
    const id: string = getRandomId(7);
    this.users.push({
      id,
      name,
      points: 0,
    });
    return id;
  }

  submit(
    roomId: string,
    problemId: string,
    submission: allowedSubmissions,
    userId: string
  ) {
    const problem = this.problems.find((x) => x.id == problemId);
    const user = this.users.find((x) => x.id == userId);
    if (!problem || !user) return;
    //each user can make only one submission to a problem
    if (problem.submissions.find((x) => x.userId === userId)) return;
    const isCorrect: boolean = problem.answer === submission;
    problem.submissions.push({
      problemId,
      userId,
      isCorrect,
      optionSelected: submission,
    });
    user.points += isCorrect
      ? 1000 - (500 * (new Date().getTime() - problem.startTime)) / 20
      : 0;
  }
  getLeaderBoard() {
    return this.users.sort((a, b) => (a.points < b.points ? 1 : -1)).slice().splice(0,20);
  }

  getCurrentState(){
    switch (this.currentState) {
      case "not_started":
        return {type:this.currentState};
      case "is_ended":
        return {type:this.currentState, leaderBoard: this.getLeaderBoard()}
      case "leaderboard":
        return {type:this.currentState, leaderboard:this.getLeaderBoard()}
      case "question":
        return {type: this.currentState, problem: this.problems[this.activeProblem]}
    }
  }
}