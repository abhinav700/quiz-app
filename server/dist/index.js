"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IoManager_1 = require("./managers/IoManager");
const UserManager_1 = require("./managers/UserManager");
const io = IoManager_1.IoManager.getIo();
const PORT = 5000;
try {
    io.listen(PORT);
    console.log("server started at " + PORT);
}
catch (error) {
    console.log(error);
}
const userManager = new UserManager_1.UserManager();
io.on("connection", (socket) => {
    userManager.addUser(socket);
});
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
