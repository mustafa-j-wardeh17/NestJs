import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// To inject routes by use guard for authentication by jwt bearer token
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}