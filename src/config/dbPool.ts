import mysql from 'mysql2/promise';
import enviroments from './enviroments';

const dbPool = mysql.createPool({
    host: enviroments.db.host,
    user: enviroments.db.user,
    port: enviroments.db.port,
    password: enviroments.db.password,
    database: enviroments.db.database,
    ssl: {"rejectUnauthorized":true}
});

export default dbPool