import { Algorithm } from "jsonwebtoken"

interface enviromentsTypes {
    app: {
        port: number
        secret: string
        allowOrigin: string
        message: string
        host: string
    },
    db: {
        port: number
        host: string
        database: string
        user: string
        password: string
    }
    jwt: {
        secret: string
        alg: Algorithm
    }
    google: {
        clientId: string
        clientSecret: string
    }
}

export default enviromentsTypes;