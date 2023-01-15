import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config({path: './.env'})

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});


const GOOGLE_CLIENT_ID: string = `${process.env.GOOGLE_CLIENT_ID}`;
const GOOGLE_CLIENT_SECRET: string = `${process.env.GOOGLE_CLIENT_SECRET}`;

console.log({
  GOOGLE_CLIENT_ID: `${process.env.GOOGLE_CLIENT_ID}`,
  GOOGLE_CLIENT_SECRET: `${process.env.GOOGLE_CLIENT_SECRET}`,
});

// Configure the Google strategy for Passport
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, (accessToken: string, refreshToken: string, profile: any, done: any) => {
  // Here, you can use the profile object to retrieve the user's email and other information
  // Then, you can check if the user already exists in your database
  // If the user does not exist, you can insert a new record into the database
  console.log(profile);
  // If the authentication is successful, return the user object
  return done(null, profile);
}));

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;
