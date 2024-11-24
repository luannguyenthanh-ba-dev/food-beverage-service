import { Types } from 'mongoose';
/**
 * This token that NestJs will use to registered in the scope of module (Categories) - This name will map to "fandbCategories" collection in Database
 */
export const FANDB_CATEGORIES_SCHEMA_TOKEN = 'fandbCategories';

/**
 * This token that NestJs will use to registered in the scope of module (Products) - This name will map to "products" collection in Database
 */
export const PRODUCTS_SCHEMA_TOKEN = 'products';

export enum ROLES {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
  VENDOR = 'vendor',
}

export interface IUserPayload {
  sub?: string | Types.ObjectId;
  _id?: string | Types.ObjectId;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  birthday?: string;
  height?: number;
  weight?: number;
  threeRounds?: object;
  role?: string[];
  gender?: number;
  status?: string;
  major?: string;
  gallery?: string[];
  avatar?: string;
  isVerified?: boolean;
  isDeleted?: boolean;
}

export const CanManageObjects = (user: IUserPayload, object: any): boolean => {
  if (
    user.role.includes(ROLES.SUPER_ADMIN) ||
    user.role.includes(ROLES.ADMIN)
  ) {
    return true;
  }
  if (user.role.includes(ROLES.VENDOR) || user.role.includes(ROLES.USER)) {
    return object.ownerId === user._id;
  }
};
