import { Document, Types } from 'mongoose';

/**
 * The common interface FAndModel - Must exactly equal to FAndModel. Field use camelCase. Extend Document for use when query!
 */
export interface IProductsCategoriesModel extends Document {
  readonly _id: Types.ObjectId;
  readonly name: string;
  // In TypeScript, the Partial<T> type allows you to create a new type with all the properties of type T, but with all properties set to optional
  // readonly parent?: Partial<IProductsCategoriesModel>;
  // timestamp
  readonly createdAt?: number;
  readonly updatedAt?: number;
  readonly deletedAt?: number;
  readonly isDeleted?: boolean;
}
