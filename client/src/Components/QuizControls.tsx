import { Socket } from "socket.io-client"

const QuizControls = ({roomId, socket}: {roomId:string, socket: Socket}) => {
  return (
    <div>
      <button onClick = {(e) => {
        socket.emit("next",{
          roomId
        })
      }}>Next Problem</button>
    </div>

  )
}

export default QuizControls