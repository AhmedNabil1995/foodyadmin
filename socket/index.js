const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors:{
        origin: 'https://foody-admin.herokuapp.com'
    }
 });
const PORT = process.env.PORT || 3000

let activeUsers = [];


io.on('connection',(socket)=>{
    
    socket.on('addUser',(newUserId)=>{
        if(!activeUsers.some((user)=>(user?.userId == newUserId))){
            activeUsers.push({userId:newUserId,socketId:socket.id});
            console.log('new user connected');
        }

        io.emit('getUsers',activeUsers);
    })

    socket.on('disconnect',()=>{
       activeUsers = activeUsers.filter((user)=>user.socketId !== socket.id);
       console.log('user disconnected')

       io.emit('getUsers',activeUsers);
    })

    socket.on('sendMessage',(data)=>{

        let {recieverId} = data;
        const user = activeUsers.find((user)=>user.userId === recieverId);
        console.log("Sending from socket to :", recieverId)
        console.log("Data: ", data)
        if(user){
        io.to(user.socketId).emit('recieveMessage',data)
        }
    })
})

httpServer.listen(PORT);