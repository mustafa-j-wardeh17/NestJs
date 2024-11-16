import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

// To inject application by PassportStrategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Extracts the JWT from the Authorization header as a Bearer token.
            ignoreExpiration: false,// reject expired tokens
            secretOrKey: "secret_pass"
        })
    }

    async validate(payload) { //automatically invoked after the JWT is successfully validated to extracts data from the token's payload and provides it to the request context

        // returned object becomes available in the <request.user>
        return {
            userId: payload.id,
            userName: payload.userName,
            email: payload.email,
            role: payload.role
        }
    }

}