import { Types } from 'mongoose';
import { Currency, MassUnit } from '../products.const';

export interface IFindProductsFilters {
  _id?: Types.ObjectId | string;
  name?: string;
  price?: number;
  categories?: Types.ObjectId | string;
  ownerId?: string;
  // timestamp
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
  isDeleted?: boolean;
}

export interface ICreateProductInfo {
  name: string;
  price: number;
  amount: number;
  mass: {
    value: number;
    unit: MassUnit;
  };
  currency: Currency;
  provenance: string;

  geographicalIndication: string;
  categories: string;

  thumbnail: string;
  avatar: string;
  imagesList?: string[];
  description: string;

  ownerId: string;
}
