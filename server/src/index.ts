import http from "http";
import { IoManager } from "./managers/IoManager";
import { UserManager } from "./managers/UserManager";
  
const io = IoManager.getIo()
const PORT = 5000;

try {
  io.listen(PORT)
  console.log("server started at " + PORT);
} catch (error) {
  console.log(error)
}

const userManager = new UserManager();
io.on("connection", (socket)=>{
       userManager.addUser(socket)
})


























// import { IoManager } from "./managers/IoManager";

// const io = IoManager.getIo();

// io.on("connection", (client: any) => {
//   console.log("Client is connected");
//   client.on("event", (data: any) => {
//         let message = JSON.parse(data);
//         console.log(message)
//         const type = message.type
//         console.log(type);
//   });

//   client.on("disconnect", () => {});
// });


// const PORT = 3000;

// io.listen(PORT, () => {
//   console.log(`server has started at ${PORT}`);
// });

