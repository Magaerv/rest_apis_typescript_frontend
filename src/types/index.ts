import { number, object, string, boolean, InferOutput, array } from 'valibot';

export const DraftProductSchema = object({
	name: string(),
	price: number(),
	availability: boolean(),
	gender: string(),
	description: string(),
	quantity: number(),
	imageUrl: string(),
	categoryId: number(),
	subcategoryId: number(),
});

export const ProductSchema = object({
	id: number(),
	name: string(),
	price: number(),
	availability: boolean(),
	gender: string(),
	description: string(),
	quantity: number(),
	imageUrl: string(),
	categoryId: number(),
	subcategoryId: number(),
});

export const ProductsSchema = array(ProductSchema);
export type Product = InferOutput<typeof ProductSchema>;
