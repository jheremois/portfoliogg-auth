import express from "express";
import dotenv from "dotenv";
import AuthRoutes from "./router/auth.routes";
import http from "http"
import 'reflect-metadata'
import passport from "passport";
import cors from "cors";
import session from 'express-session';


const app = express()

const server = http.createServer(app);

dotenv.config({path: './.env'})
app.set('port', process.env.APP_PORT)

const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions))

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));

app.use(express.json())
app.use(passport.initialize())

const port = app.get('port')

app.use('/auth/', AuthRoutes)
app.use('/', (req: any, res: any)=> {
    res.send("Ritme Auth")
})

server.listen(port);
server.on('error', (err)=>{
    console.log(err)
});

server.on('listening', ()=>{
    console.log(`Online on port ${port}`)
});