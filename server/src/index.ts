import http from "http";
import { IoManager } from "./managers/IoManager";
  
const io = IoManager.getIo()

io.on("connection", (client)=>{
    client.on("event", data => {
      console.log(data);
    })
    client.on("disconnect", () => {

    })

})

const PORT = 3000;
io.listen(3000)



























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

