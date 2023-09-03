const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const User = require('./models/User');
const mongoose = require('mongoose')
require("dotenv").config();
var ObjectId = require("mongodb").ObjectId;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: "*"
    }
})

const URI = process.env.DB_URI

mongoose
    .connect(URI)
    .then(() => {
        console.log("⚡ Database Connected");
    })
    .catch((e) => {
        console.log(e);
    });



var rooms = [];


io.on("connection", (socket) => {

    socket.on("find-rooms", () => {
        socket.emit("live-users", rooms)
    })

    socket.on("join-room", async (arg) => {
        const roomExists = rooms.filter((room) => room._id.equals(new ObjectId(arg.id)));
        if (roomExists.length === 0 && arg.role === 'user') {
            socket.join(arg.id);
            const user = await User.findById(arg.id)
            rooms.push(user)
            io.emit("online", user);
        }
        else if (roomExists.length === 1 && arg.role !== 'user') {
            socket.join(arg.id);
            socket.to(arg.id).emit("admin-joined");
            const user = await User.findById(arg.id)

            var tempRooms = rooms.filter((room) => room._id.equals(new ObjectId(arg.id))===false)
            rooms = tempRooms

            io.emit("not-online", user)
            io.to(arg.id).emit("message", { time: new Date(), role: 'admin', message: 'Hello sir/madam,How may I help you' });
        }

    })

    socket.on('send-new-message', (data) => {
        io.to(data.id).emit("message", { time: data.time, role: data.role, message: data.message });
    })

    socket.on("server-room-closed",(arg)=>{
        var tempRooms = rooms.filter((room) => room._id.equals(new ObjectId(arg.id))===false)
        rooms = tempRooms
        io.to(arg.id).emit("room-closed")
    })


});

httpServer.listen(8081, () => {
    console.log('Listening on port 8081')
});

