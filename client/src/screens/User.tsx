import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import CurrentQuestion from '../Components/CurrentQuestion';
import LeaderBoard from '../Components/LeaderBoard';
import UserAvatar from '../Components/UserAvatar';
import { useParams } from 'react-router-dom';
const User = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [avatarImage, setAvatarImage] = useState("")
  const params = useParams()
  useEffect(()=>{
      setAvatarImage(prevAvatarImage => `${params.roomId}${Math.random()*100}`)
  },[])
  if (!submitted) {
    return <div className='flex flex-col justify-center items-center mt-10 text-black'>

      <h1 className='text-[45px] font-bold'>Quizily</h1>
        <UserAvatar url = {avatarImage} />
      <div className="mt-10">
        <p className='font-medium'>Enter your name</p>
        <input className='mt-4 bg-gray-100 w-[500px] py-3 px-3 rounded-sm text-gray-900' type="text" placeholder='John Doe' onChange={(e) => setName(name => e.target.value)} value={name} />
      </div>
      <button className='mt-8 hover:opacity-90 bg-[#2e2b2b] text-white px-8 font-bold py-4 rounded-full' onClick={() => { setSubmitted(submitted => true) }}> Join Quiz</button>
    </div>
  }
  return <UserLoggedIn name={name} />
}

export const UserLoggedIn = ({ name }: { name: any }) => {
  const [socket, setSocket] = useState<null | Socket>(null)
  const [currrentState, setCurrentState] = useState("not_started");
  const [searchParams, setSearchParams] = useSearchParams()
  const roomId = searchParams.get("roomId");
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [leaderboard, setLeaderBoard] = useState([])
  const [userId, setUserId] = useState("");
  
  useEffect(() => {
    const socket = io("http://localhost:5000")
    setSocket(socket)

    socket.on("connect", () => {
      socket.emit("join", {
        roomId,
        name
      })
    })

    socket.on("init", ({ userId, state }) => {
      setUserId(userId);
      if (state.leaderboard) {
        setLeaderBoard(leaderboard => state.leaderboard);
      }

      if (state.problem) {
        setCurrentQuestion((currentQuestion:any) => state.problem);
      }

      setCurrentState(currrentState => state.type);
    })

    socket.on("leaderboard", data => {
      setCurrentState("leaderboard");
      setLeaderBoard(leaderboard => data.leaderboard)
    })

    socket.on("problem", (data) => {
      setCurrentState("problem")
      setCurrentQuestion(data.problem);
    })



    return () =>{
      socket.off("problem");
      socket.off("eaderboard");
      socket.off("connect");
      socket.off("init");
    }
  }, [])

  if (currrentState === "not_started") {
    return (
      <div className='w-full h-[80vh] flex flex-col items-center justify-center'>
        <h1 className='text-[50px] font-bold'>The quiz has not started yet.</h1>
        <h3 className='my-3 text-[20px] text-gray-500 font-bold'>Waiting for the admin to start the quiz</h3>
      </div>
    )
  }


  if (currrentState === "problem") {
    return (
      <CurrentQuestion question={currentQuestion} socket = {socket!} userId={userId} roomId={roomId!} problemId={currentQuestion!.id}
      />
    )
  }
  if (currrentState === "leaderboard") {
    return (
      <LeaderBoard leaderboard={leaderboard} />
    )
  }
  return (
    <div className=''>
      Quiz has ended
    </div>

  )

}

export default User