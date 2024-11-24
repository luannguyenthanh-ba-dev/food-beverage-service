import { Types } from 'mongoose';

export interface IFandB {
  _id?: string | Types.ObjectId;
  name?: string;
  // In TypeScript, the Partial<T> type allows you to create a new type with all the properties of type T, but with all properties set to optional
  parent?: Partial<IFandB>;
  // timestamp
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
  isDeleted?: boolean;
}
