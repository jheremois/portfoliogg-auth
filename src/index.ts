import express from "express";
import AuthRoutes from "./router/auth.routes";
import UserRoutes from "./router/user.routes";
import http from "http"
import 'reflect-metadata'
import passport from "passport";
import cors from "cors";
import session from 'express-session';
import enviroments from "./config/enviroments";

const app = express()
const server = http.createServer(app);

app.set('port', enviroments.app.port)
const port = app.get('port')

const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions))


app.use(session({ secret: enviroments.app.secret, resave: false, saveUninitialized: false }));
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session());

app.use('/auth/', AuthRoutes)
app.use('/user/', UserRoutes())
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