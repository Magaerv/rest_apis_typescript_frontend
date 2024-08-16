import { number, object, string, boolean } from 'valibot';

export const DraftProductSchema = object({
	name: string(),
	price: number(),
	//availability: boolean(),
	gender: string(),
	description: string(),
	quantity: number(),
	imageUrl: string(),
	categoryId: number(),
	subcategoryId: number(),
});
