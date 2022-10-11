const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Running');
});

    let online = []

io.on("connection", (socket) => {
    console.log('connected')

    socket.on('addToServer',(id)=>{
      let oldUser =  online.find((obj)=>{
            return obj.userId === id
        })

        if(!oldUser){
            online.push({userId:id,socketId:socket.id});
            io.emit('getAddedToServer',online);
        }
    })

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
       online = online.filter((obj)=>{
            return obj.socketId !== socket.id;
        })
        io.emit('getAddedToServer',online);
	});

	socket.on("callUser", ({ userToCall, signalData, from }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));