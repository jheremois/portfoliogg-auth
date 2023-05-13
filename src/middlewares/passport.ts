import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import enviroments from '../config/enviroments';
import dbPool from '../config/dbPool';

console.log({
  GOOGLE_CLIENT_ID: enviroments.google.clientId,
  GOOGLE_CLIENT_SECRET: enviroments.google.clientSecret,
});

passport.use(new GoogleStrategy({
  clientID: enviroments.google.clientId,
  clientSecret: enviroments.google.clientSecret,
  callbackURL: '/auth/google/callback', 
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
  console.log(profile);
  
  await dbPool.query(
    'SELECT * FROM users WHERE email = ?', [profile.email]
  ).then(async (rows: any)=>{
    if (rows[0].length > 0) {
      await dbPool.query(
        'UPDATE users SET password = ? WHERE email = ?', [accessToken, profile.email]
      ).then(()=>{
        console.log("actualizo")
        return done(null, { portUIdJ: rows[0][0].id, portUEmailJ: profile.email })
      })
    } else {
      try {
        const userRes: any = await dbPool.query(
          'INSERT INTO users SET ?', {
            email: profile.email,
            password: accessToken, 
            user_ip: ""
          }
        );

        await dbPool.query(
          'INSERT INTO profiles SET ?', {
            user_id: userRes[0].insertId,
            display_name: profile.displayName,
            profile_pic: profile.picture || "",
          }
        );

        console.log("inserto");
        return done(null, {portUIdJ: userRes[0].insertId, portUEmailJ: profile.email});
      } catch (error) {
        done(error);
      } 
    } 
  })

}));

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;