import { Socket } from "socket.io";
import { QuizManager } from "./QuizManager";
import { allowedSubmissions } from "./Quiz";

const ADMIN_PASSWORD = "ADMIN_PASSWORD";

export class UserManager {
  private quizManager;
  constructor() {
    this.quizManager = new QuizManager();
  }

  addUser(socket: Socket) {
    this.createHandlers(socket);
  }

  private createHandlers(socket: Socket) {
    socket.on("join-admin", (data) => {
      if (data.password != ADMIN_PASSWORD) return;

      socket.on("createProblem", (data) => {
        this.quizManager.addProblem(data.roomId, data.problem);
      });

      socket.on("next", (data) => {
        this.quizManager.next(data.roomId);
      });

      socket.on("createQuiz", (data) => {
        this.quizManager.addQuiz(data.roomId);
      });

      socket.on("submit", (data: any) => {
        data = JSON.parse(data);
        const userId = data.userId;
        const problemId = data.problemId;
        try {
          const submission: allowedSubmissions = data.submission;
          this.quizManager.submit(data.roomId, problemId, submission, userId);  
        } catch (error) {
          console.log("INPUT IS INVALID")
        }
        
      });
    });

    socket.on("join", (data) => {
      const userId = this.quizManager.addUser(data.roomId, data.name);
      socket.emit("init", {
        userId,
        state: this.quizManager.getCurrentState(data.roomId),
      });
      socket.join(data.roomId); 
    });
    socket.on("submit", (data: any) => {
      data = JSON.parse(data);
      const userId = data.userId;
      const problemId = data.problemId;
      const submission: allowedSubmissions = data.submission;
      const roomId = data.roomId;
      this.quizManager.submit(roomId, problemId, submission, userId);
    });
  }
}
