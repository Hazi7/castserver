import { Injectable, type CanActivate, type ExecutionContext } from "@nestjs/common";
import type { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log('🚀 ~ AuthGuard ~ canActivate ~ context:', context);
        const request = context.switchToHttp().getRequest();
        const user = request;

        return user;
    }
}

