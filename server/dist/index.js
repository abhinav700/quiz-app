"use strict";
const server = require("http").createServer();
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (client) => {
    console.log("Client is connected");
    client.on("event", (data) => {
        let message = JSON.parse(data);
        console.log(message);
        const type = message.type;
        console.log(type);
    });
    client.on("disconnect", () => { });
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`server has started at ${PORT}`);
});
