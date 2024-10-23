import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            clientID:"238887280145-9dtkr6g4tfq1fm832sl9v1d84bms2vam.apps.googleusercontent.com",
            clientSecret:"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",
            callbackURL:"http://localhost:3000/auth/google/callback",
            scope: ['email','profile']
        })
    }

    async validate(accessToken:string , refreshToken:string , profile:any,cb:VerifyCallback){
        console.log(profile,accessToken,refreshToken);
        return cb(null,profile)
    }
}