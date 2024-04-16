import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import router from './routes/router.js';
import cors from 'cors'
import auctionSockets from './routes/auctionSocket.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: { origin: "*"}});
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1', router)

server.listen(port, ()=>{
    console.log('Listening at port http://localhost:'+port);
});

auctionSockets(io);