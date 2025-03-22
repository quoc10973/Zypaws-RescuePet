import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler()); // reflector get metadata which is roles from route handler 

        if (!roles) {
            return true; // If no roles are defined, allow access
        }

        // if roles are defined, check if the user has the required role
        const request = context.switchToHttp().getRequest();
        const user = request.current; // 'current' is the key where the user object is stored in request through the middleware


        //check if user has the required role, if not throw an exception
        if (!user?.role || !roles.includes(user.role)) {
            throw new ForbiddenException("You have no permission to access this resource.");
        }

        return true;
    }

}