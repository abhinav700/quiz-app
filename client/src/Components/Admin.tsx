import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import CreateProblem from "./CreateProblem";
import QuizControls from "./QuizControls";

const Admin = () => {
  const [socket, setSocket] = useState<null | Socket>(null);
  const [quizId, setQuizId] = useState<null | String>(null);
  const [roomId, setRoomId] = useState("");
  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);
    socket.on("connect", () => {
      socket.emit("join-admin", {
        password: "ADMIN_PASSWORD",
      });
    });
    socket.on("admin_init", () => {});
  }, []);
  if (!quizId) {
    return (
      <div className=" ">
        <div className="mt-10 flex flex-col justify-center items-center text-black">
          <h1 className="font-bold text-[45px]">Quizily</h1>
          <h2 className="text-[25px] mt-6">Enter the code</h2>
          <p className="font-bold mt-4 text-gray-500">
            Users will join using this code
          </p>
          <input
            type="text"
            placeholder="Your code"
            className="border-solid border-[1px] px-2 py-2 mt-4 border-[#b594eb] rounded-lg"
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
          />
          <button
            onClick={() => {
              socket?.emit("createQuiz", { roomId });
              setQuizId(roomId);
            }}
            className="bg-black px-6 py-3 rounded-full text-white hover:opacity-90 mt-6"
          >
            Create Room
          </button>
        </div>
       
      </div>
    );
  } else {
    return (
      <div>
        <CreateProblem roomId={roomId} socket={socket!} />
        <QuizControls roomId={roomId} socket={socket!} />
      </div>
    );
  }
};

export default Admin;
