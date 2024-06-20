import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import CreateProblem from './CreateProblem';
import QuizControls from './QuizControls';



const Admin = () => {
  const [socket, setSocket] = useState<null | Socket>(null)
  const [quizId, setQuizId] = useState<null | String>(null);
  const [roomId, setRoomId] = useState("")
  useEffect(() => {
    const socket = io('http://localhost:5000');
    setSocket(socket)
    socket.on("connect", () => {
      socket.emit("join-admin", {
        password: "ADMIN_PASSWORD"
      
      })
    })
    socket.on("admin_init", () => {

    })
  }, [])
  if (!quizId) {

    return (
      <div className=" ">
        <input type="text" className='b ' onChange={(e) => { setRoomId(e.target.value) }} />
        <button onClick={() => {
          socket?.emit("createQuiz", {roomId});
          setQuizId(roomId);
        }}>Create room</button>

      </div>
    )
  }
  else {
    return <div>
      <CreateProblem roomId={roomId} socket={socket!} /> 
      <QuizControls roomId={roomId} socket= {socket!} />  
      </div>
  }
}

export default Admin