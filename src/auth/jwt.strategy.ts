import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

// To inject application by PassportStrategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "secret_pass"
        })
    }

    async validate(payload) {
        return {
            userId: payload.id,
            userName: payload.userName,
            email: payload.email,
            role: payload.role
        }
    }

}