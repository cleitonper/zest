import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (info) {
      const messages = {
        Error: 'No auth token provided',
        JsonWebTokenError: 'The provided token has a invalid signature',
        TokenExpiredError: 'The provided token has been expired',
      };

      const message = messages[info.name] || 'Invalid token';
      const error = (info.name === 'Error') ? 'InvalidTokenError' : info.name;

      throw new UnauthorizedException(message, error);
    }

    if (err || !user) {
      throw err || new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}