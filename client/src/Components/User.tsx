import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import CurrentQuestion from './CurrentQuestion';
import LeaderBoard from './LeaderBoard';

const User = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if (!submitted) {
    return <div>
      Name - <input type="text" placeholder='name' onChange={(e) => setName(name => e.target.value)} value={name} />
      <button onClick={()=> {setSubmitted(submitted => true)}}> Submit</button>;
    </div>
  }
  return <UserLoggedIn name = {name}/>
}

export const UserLoggedIn = ({name}:{name:any}) => {
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
      if(state.leaderboard){
        setLeaderBoard(state.leaderboard);
      }
      
      if(state.problem){
        setCurrentQuestion(currentQuestion => state.problem);
      }

      setCurrentState(currrentState => state.type);
    })

    socket.on("leaderboard", data=>{
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

export default User