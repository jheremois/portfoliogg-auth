import { Request, Response, Router } from "express";
import dbPool from "../config/dbPool";
import { expressjwt } from "express-jwt";
import jwt from 'jsonwebtoken';
import enviroments from "../config/enviroments";
const router = Router()

const UserRoutes = ()=>{
    const authenticate = expressjwt({ secret: enviroments.jwt.secret, algorithms: [enviroments.jwt.alg] })

    router.get('/', (req: Request, res: Response)=>{res.json("not found")})

    router.get("/private", authenticate, (req, res) => {
        
        var token = req.headers.authorization || ""
        const decoded: any = jwt.verify(token.slice(7, token.length), enviroments.jwt.secret)

        dbPool.query('SELECT * FROM profiles WHERE user_id = ?', [decoded.portUIdJ]).then((rows: any)=>{
            res.json({
                myProfile: rows[0][0]
            })
        })

    });

    router.get('/:userId', (req,  res: Response)=>{
        dbPool.query('SELECT * FROM profiles WHERE user_name = ?', req.params.userId).then((userData: any)=>{
            userData[0].length
            ?
                res.json(userData[0][0])
            :
                res.status(404).json({errorMsg: "no users where found"})
        }).catch((queryErr)=>{
            res.json(queryErr)
        })
    }) 
    
    return router
}

export default UserRoutes