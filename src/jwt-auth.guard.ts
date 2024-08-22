import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.jwt;  // Vérifiez la présence du token dans les cookies

    if (!token) {
      return null;  // Retournez false si le token est absent
    }

    return super.canActivate(context);
  }
}
