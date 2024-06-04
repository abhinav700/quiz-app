import { IoManager } from "./IoManager";
import { allowedSubmissions, Quiz } from "./Quiz";

export class QuizManager{
    private quizes:Quiz[];

    constructor(){
        this.quizes = [];
        
    }

    start(roomId : string){
        const io = IoManager.getIo();
        const quiz = this.quizes.find(quiz => quiz.roomId === roomId)
        quiz?.start()
    }
    
    public addUser(roomId :string, name:string){
        const userId = this.getQuiz(roomId)?.addUser(name);    
    }

    private getQuiz (roomId: string){
       return this.quizes.find(quiz => quiz.roomId === roomId) ?? null;
    }
    
    public submit(roomId: string, problemId : string, submission : allowedSubmissions, userId: string)
    {
        const quiz = this.quizes.find(q => q.roomId === roomId);
        if(quiz)
            quiz.submit(roomId, problemId, submission, userId);
    }

    getCurrentState(roomId :string){
        const quiz = this.quizes.find(x => x.roomId == roomId);
        if(!quiz)
            return null;
        return quiz.getCurrentState();
    }
};