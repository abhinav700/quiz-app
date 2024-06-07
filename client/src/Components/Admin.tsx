import { useEffect } from 'react';
import { io } from 'socket.io-client';



const Admin = () => {
  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("join-admin",{
          password: "ADMIN_PASSWORD"
        })
    })
    socket.on("admin_init",() =>{
      
    })
  }, [])
  return (
    <div className="text-black">
      <h1>Helllo admin</h1>
    </div>
  )
}

export default Admin