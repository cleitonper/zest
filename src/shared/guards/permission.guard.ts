import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class PermissionGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return this.validatePermissions(request);
  }

  private validatePermissions(request): boolean {
    const { user, raw } = request;
    const { permissions } = user;
    const { method, url } = raw ? raw : request;

    const resource = url.replace(/^(\/)(\w+)(.)*/i, '$2');
    const requestedPermission = this.getPermissionFromMethod(method);
    const userPermissions = permissions[resource];

    if (!userPermissions) return false;
    if (!userPermissions.some((userPermission) => userPermission === requestedPermission)) return false;

    return true;
  }

  private getPermissionFromMethod(method: string) {
    const mapMethodPermission = {
      GET: 'read',
      PUT: 'write',
      POST: 'write',
      DELETE: 'delete',
    };

    return mapMethodPermission[method];
  }
}