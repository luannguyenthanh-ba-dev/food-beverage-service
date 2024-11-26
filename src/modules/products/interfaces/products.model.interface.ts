import { Document, Types } from 'mongoose';
import { IProductsCategoriesModel } from 'src/modules/categories/products/interfaces/products-categories.model.interface';
import { Currency, MassUnit } from '../products.const';

export interface IProductsModel extends Document {
  readonly _id: Types.ObjectId;
  readonly name: string;
  readonly price: number;
  readonly amount: number;
  readonly mass: {
    value: number;
    unit: MassUnit;
  };
  readonly currency: Currency;
  readonly provenance: string;
  readonly geographicalIndication: string;
  // In TypeScript, the Partial<T> type allows you to create a new type with all the properties of type T, but with all properties set to optional
  readonly categories: Partial<IProductsCategoriesModel>[];
  readonly thumbnail: string;
  readonly avatar: string;
  readonly imagesList?: string[];
  readonly description: string;
  readonly ownerId: string;
  // timestamp
  readonly createdAt?: number;
  readonly updatedAt?: number;
  readonly deletedAt?: number;
  readonly isDeleted?: boolean;
}
