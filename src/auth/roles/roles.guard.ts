import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate { // CanActivate : (admin || user) will ask CanActivate to reach this route and CanActivate allow or disallow to reach

  //response come from reflector if allow or disallow to reach this route
  constructor(private reflector: Reflector) { }

  // to check the match between roles and userRole
  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole)
  }


  // ExecutionContext: Provides details about the current execution context, including the handler and request details
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.get<string[]>('roles', context.getHandler())

    // if no roles to this route allow access to reach it
    if (!roles) {
      return true;
    }

    // Retrieves the HTTP request object.
    const request = context.switchToHttp().getRequest();
    
    
    const user = request.user;


    return this.matchRoles(roles, user.role);
  }
}
