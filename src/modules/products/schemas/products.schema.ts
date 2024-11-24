import * as mongoose from 'mongoose';
import { Currency, MassUnit } from '../products.const';
import { FANDB_CATEGORIES_SCHEMA_TOKEN } from 'src/common/utils/constant.util';
const { Schema } = mongoose;

export const ProductsSchema = new mongoose.Schema({
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
  currency: { type: String, required: true, enum: Currency },
  provenance: { type: String, required: true },
  geographicalIndication: { type: String, required: true },
  categories: [
    {
      // Note: We just focus on 1 level child, please don't create as a Tree for categories
      type: Schema.Types.ObjectId,
      ref: FANDB_CATEGORIES_SCHEMA_TOKEN,
      default: null,
    },
  ],
});
