import { USER_ROLE } from "@/data/constants";
import { relations } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const createdAt = timestamp("createdAt").notNull().defaultNow();
const updatedAt = timestamp("updatedAt")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const userRoleEnum = pgEnum("role", USER_ROLE);

export const CategoryTable = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryName: text("categoryName").notNull(),
  createdAt,
  updatedAt,
});

export const ProductTable = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("categoryId")
      .notNull()
      .references(() => CategoryTable.id, { onDelete: "cascade" }),
    productName: text("productName").notNull(),
    material: text("material").notNull(),
    size: text("size").notNull(),
    description: text("description"),
    availabilityStatus: boolean("availabilityStatus").notNull().default(true),
    price: integer("price").notNull(),
    unit: text().notNull().default("pcs"),
    discount: doublePrecision("discount").notNull(),
    createdAt,
    updatedAt,
  },
  (table) => ({
    categoryIdIndex: index("categoryIdIndex").on(table.categoryId),
  })
);

export const ProductImages = pgTable(
  "productImages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("productId")
      .notNull()
      .references(() => ProductTable.id, { onDelete: "cascade" }),
    imageLink: text("imageLink").notNull(),
    mainImage: boolean("mainImage").notNull().default(false),
    createdAt,
    updatedAt,
  },
  (table) => ({
    productIdIndex: index("productIdIndex").on(table.productId),
  })
);

export const AdminTable = pgTable("admins", {
  id: uuid("id").primaryKey(),
  displayName: text("displayName").notNull(),
  role: userRoleEnum("role").notNull(),
});

export const ProductTableRelation = relations(ProductTable, ({ one }) => ({
  category: one(CategoryTable, {
    fields: [ProductTable.categoryId],
    references: [CategoryTable.id],
  }),
}));

export const ProductImagesTableRelation = relations(
  ProductTable,
  ({ many }) => ({
    productImages: many(ProductImages),
  })
);

export const ImagesToProductTableRelation = relations(
  ProductImages,
  ({ one }) => ({
    product: one(ProductTable, {
      fields: [ProductImages.productId],
      references: [ProductTable.id],
    }),
  })
);
