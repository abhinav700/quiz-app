import { useState } from "react"
import { useNavigate } from "react-router-dom"
const JoinRoom = () => {
    const [roomId, setRoomId] = useState<string>("")
    const navigate = useNavigate()
    const onClickHandler = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        if(roomId === ""){
            alert("You have not entered anything");
            return;
        }
        return navigate(`/user?roomId=${roomId}`)
    }
    return (
        <div className="mt-10 flex flex-col justify-center items-center text-black">

            <h1 className="font-bold text-[45px]">Quizily</h1>
            <h2 className="text-[25px] mt-6">Enter the code to join</h2>
            <p className="font-bold mt-4 text-gray-500">It's on the screen in front of you</p>
            <input onChange={(e) => { setRoomId(roomId => e.target.value) }} value={roomId} type="text" placeholder="Your code" className="border-solid border-[1px] px-2 py-2 mt-4 border-[#b594eb] rounded-lg" />
            <button onClick={onClickHandler} className="bg-black px-6 py-3 rounded-full text-white hover:opacity-90 mt-6">Join</button>
        </div>
    )
}

export default JoinRoom