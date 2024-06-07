import { getRandomId } from "../utils/getRandomString";
import { IoManager } from "./IoManager";
import { allowedSubmissions, Quiz } from "./Quiz";

type addProblemArgs = {
  title: string;
  description: string;
  image: string;
  answer: allowedSubmissions;
  option: {
    id: number;
    title: string;
  };
};

export class QuizManager {
  private quizes: Quiz[];

  constructor() {
    this.quizes = [];
  }

  start(roomId: string) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) return;
    quiz.start();
  }

  public addUser(roomId: string, name: string) {
    const userId = this.getQuiz(roomId)?.addUser(name);
  }

  private getQuiz(roomId: string) {
    return this.quizes.find((quiz) => quiz.roomId === roomId) ?? null;
  }

  public submit(
    roomId: string,
    problemId: string,
    submission: allowedSubmissions,
    userId: string
  ) {
    const quiz = this.quizes.find((q) => q.roomId === roomId);
    if (quiz) quiz.submit(roomId, problemId, submission, userId);
  }

  getCurrentState(roomId: string) {
    const quiz = this.quizes.find((x) => x.roomId == roomId);
    if (!quiz) return null;
    return quiz.getCurrentState();
  }

  addProblem(roomId: string, problem: addProblemArgs) {
    const quiz = this.getQuiz(roomId);
    if (quiz) {
      quiz.addProblem({
        ...problem,
        startTime: new Date().getTime(),
        id: getRandomId(3),
        submissions: [],
      });
    }
  }
  next(roomId: string) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) return;
    quiz.next();
  }

  addQuiz(roomId : string){
    const quiz = new Quiz(roomId);
    this.quizes.push(quiz);
  }
}
