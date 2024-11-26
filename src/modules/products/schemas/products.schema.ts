import * as mongoose from 'mongoose';
import { Currency, MassUnit } from '../products.const';
import { PRODUCTS_CATEGORIES_SCHEMA_TOKEN } from 'src/common/utils/constant.util';
const { Schema } = mongoose;

export const ProductsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0, min: 0 },
    amount: { type: Number, required: true, min: 1 },
    mass: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: MassUnit,
        require: true,
      },
    },
    currency: {
      type: String,
      required: true,
      enum: Currency,
      default: Currency.VND,
    },
    provenance: { type: String, required: true },
    geographicalIndication: { type: String, required: true },
    categories: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: PRODUCTS_CATEGORIES_SCHEMA_TOKEN,
        },
      ],
      required: true,
    },
    thumbnail: { type: String, required: true },
    avatar: { type: String, required: true },
    imagesList: [String],
    description: { type: String, required: true },

    ownerId: { type: String, required: true },
    createdAt: Number,
    updatedAt: Number,
    deletedAt: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
    },
  },
);
