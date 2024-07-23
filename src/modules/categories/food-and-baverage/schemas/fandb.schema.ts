import * as mongoose from 'mongoose';
import { FANDB_CATEGORIES_SCHEMA_TOKEN } from '../fandb.const';
const { Schema } = mongoose;

export const FAndBCategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    parent: {
      // Note: We just focus on 1 level child, please dont create as a Tree for categories
      type: Schema.Types.ObjectId,
      ref: FANDB_CATEGORIES_SCHEMA_TOKEN,
      default: null,
    },
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
