import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import CurrentQuestion from '../Components/CurrentQuestion';
import LeaderBoard from '../Components/LeaderBoard';

const JoinQuiz = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if (!submitted) {
    return <div className='flex flex-col justify-center items-center mt-10 text-black'>

      <h1 className='text-[45px] font-bold'>Quizily</h1>
      <div className="mt-10">
        <p className='font-medium'>Enter your name</p>
        <input className='mt-4 bg-gray-100 w-[500px] py-3 px-3 rounded-sm text-gray-900' type="text" placeholder='John Doe' onChange={(e) => setName(name => e.target.value)} value={name} />
      </div>
      <button className='mt-8 hover:opacity-90 bg-[#2e2b2b] text-white px-8 font-bold py-4 rounded-full' onClick={() => { setSubmitted(submitted => true) }}> Join Quiz</button>;
    </div>
  }
  return <UserLoggedIn name={name} />
}

export const UserLoggedIn = ({ name }: { name: any }) => {
  const [socket, setSocket] = useState<null | Socket>(null)
  const [currrentState, setCurrentState] = useState("not_started");
  const [searchParams, setSearchParams] = useSearchParams()
  const roomId = searchParams.get("roomId");
  const [currentQuestion, setCurrentQuestion] = useState(null)
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
        setLeaderBoard(state.leaderboard);
      }

      if (state.problem) {
        setCurrentQuestion(currentQuestion => state.problem);
      }

      setCurrentState(currrentState => state.type);
    })

    socket.on("leaderboard", data => {
      setCurrentState("leaderboard");
      setLeaderBoard(data.leaderboard())
    })

    socket.on("problem", (data) => {
      setCurrentState("problem")
      setCurrentQuestion(data.problem);
    })
  }, [])

  if (currrentState === "not_started") {
    return (
      <div>
        The quiz has not started yet
      </div>
    )
  }


  if (currrentState === "problem") {
    return (
      <CurrentQuestion question={currentQuestion} />
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

export default JoinQuiz