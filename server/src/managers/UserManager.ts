import { Socket } from "socket.io";
import { QuizManager } from "./QuizManager";
import { allowedSubmissions } from "./Quiz";

const ADMIN_PASSWORD = "ADMIN_PASSWORD"
type User = {
  roomId: string;
  socket: Socket;
};
export class UserManager {
  private users: User[];
  private quizManager;
  constructor() {
    this.users = [];
    this.quizManager = new QuizManager();
  }

  private addUser(roomId: string, socket: Socket) {
    this.users.push({ roomId, socket });
    this.createHandlers(roomId, socket);
  }

  private createHandlers(roomId: string, socket: Socket) {
    socket.on("join_admin", (data) => {
      if (data.password != ADMIN_PASSWORD) return;

      const userId = this.quizManager.addUser(roomId, data.name);
      socket.emit("admin_init", {
          userId,
          state: this.quizManager.getCurrentState(roomId),
      });

      socket.on("create_problem", (data)=> {
            this.quizManager.addProblem(data.roomId, data.problem);
      })

      socket.on("next",data => {
        this.quizManager.next(data.roomId)
      })
      
      socket.on('createQuiz', data =>{
        this.quizManager.addQuiz(data.roomId);
      })

      socket.on("submit", (data: any) => {
        data = JSON.parse(data);
        const userId = data.userId;
        const problemId = data.problemId;
        const submission: allowedSubmissions = data.submission;
        this.quizManager.submit(roomId, problemId, submission, userId);
      });
    });

    socket.on("join", (data) => {
      const userId = this.quizManager.addUser(roomId, data.name);
      socket.emit("init", {
        userId,
        state: this.quizManager.getCurrentState(roomId),
      });

      socket.on("submit", (data: any) => {
        data = JSON.parse(data);
        const userId = data.userId;
        const problemId = data.problemId;
        const submission: allowedSubmissions = data.submission;
        this.quizManager.submit(roomId, problemId, submission, userId);
      });
    });
  }
}
