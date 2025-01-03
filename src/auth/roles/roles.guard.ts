import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

// To inject routes by use guard for authorization
@Injectable()
export class RolesGuard implements CanActivate { // CanActivate : (admin || user) will ask CanActivate to reach this route and CanActivate allow or disallow to reach

  //response come from reflector if allow or disallow to reach this route
  constructor(private reflector: Reflector) { }

  /**
   * Check if the user's role matches any of the required roles.
   * @param roles - The roles required for this route.
   * @param userRole - The role assigned to the user.
   * @returns true if the user has an allowed role, false otherwise.
   */
  matchRoles(roles: string[], userRole: string): boolean {
      // Single-role user
      return roles.some((role) => role === userRole);

      // For future use: Uncomment this if users have multiple roles
      // return roles.some((role) => userRoles.includes(role));
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
    // Deny access if user or user roles are missing
    if (!user || !user.role) {
         return false;
    }

    return this.matchRoles(roles, user.role);
  }
}
