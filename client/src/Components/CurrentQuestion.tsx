import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type currentQuestionProps = {
  question: any;
  socket: Socket;
	roomId:string;
	problemId:string;
	userId:string;
};

const CurrentQuestion = ({ question, socket, roomId, problemId,userId }: currentQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  return (  
    <div className="flex flex-col items-center w-full h-[100vh]">
      <h1 className="mt-[40px] text-[40px] font-bold">Quizzily</h1>
      <div className="w-[500px] mt-8">
        <div className="text-[25px] font-medium">
          <h1>{question.description}</h1>
        </div>

        <div className="flex-col mt-4">
          {question.options.map((item: any) => {
            return (
              <div
                className="mb-4 text-[20px] font-medium w-[300px] "
                key={item.id}
              >
                <input
                  checked={item.id === selectedOption}
                  onChange={(e)=>{
                    setSelectedOption((selectedOption) => item.id);
                    
                  }}
                  onClick={(e) => {
                    if(item.id === selectedOption){
                      setSelectedOption((selectedOption)=> null)
                    }
                  }}
                  type="radio"
                  className=" mx-4"
                />
                {item.title}
              </div>
            );
          })}
        </div>
      </div>
      {!isSubmitted ? <button
        className="bg-[#4374a1] text-white text-[18px] hover:opacity-90 mt-6 px-4 py-2 rounded-xl font-medium"
        onClick={(e) => {
            if(!selectedOption)
            {
              alert("You have not selected any option");
              return;

            }
						setIsSubmitted(isSubmitted => true);
						socket.emit("submit",{
							roomId,
							problemId,
							submission: selectedOption,
              userId
						})
        }}
      >
        Submit
      </button>
      :<h1>Your response has been recorded</h1>}
    </div>
  );
};

export default CurrentQuestion;
