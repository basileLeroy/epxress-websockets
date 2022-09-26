import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from "cors"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import register from './routes/auth/register.mjs'
import login from './routes/auth/login.mjs'
import friends from "./routes/friendlist.mjs";
import posts from "./routes/posts.mjs";
import {authenticateToken} from "./routes/auth/authenticateToken.mjs";
import jwt from 'jsonwebtoken';
const { verify } = jwt;
const app = express()

dotenv.config();
// setup cors package
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}))

const server = createServer(app)

const io = new Server(server, {
    // some cors settings
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("user is connected: " + socket.id)
    socket.on('new_message', (data) => {
        socket.broadcast.emit('emit_message', data)
    })
})

app.get('/api', (req, res) => {
    res.send('Hello World')
})

app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/friends', friends)
app.use('/api/posts', posts)

app.get('/api/logout', (req, res) => {
    res.clearCookie('user-token')
    res.json({message: "User is logged out!"})
})

// app.get('/auth',  (req, res) => {
//
// })

app.get('/api/auth', authenticateToken,  (req, res) => {
    res.json({auth: true})
})

server.listen("5000", () => console.log("Server is running"));