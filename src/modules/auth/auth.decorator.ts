import { SetMetadata } from '@nestjs/common';
import { ANY_USER, ROLES_KEY } from './auth.const';

/**
 * Decorator roles, that use for check authorization on api
 * @param {String[]} roles example: 'super_admin','admin','user',...
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

/**
 * Decorator for anyone if he has account that can check authentication
 */
export const AnyUser = () => SetMetadata(ANY_USER, true);
