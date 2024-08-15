import { safeParse } from 'valibot';
import axios from 'axios';
import { DraftProductSchema } from '../types';

type ProductData = {
	[k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
	try {
		const result = safeParse(DraftProductSchema, {
			name: data.name,
			price: +data.price,
			availability: data.availability,
			gender: data.gender,
			description: data.description,
			quantity: +data.quantity,
			imageUrl: data.imageUrl,
			categoryId: data.categoryId,
			subcategoryId: data.subcategoryId,
		});
		console.log('verr', import.meta.env.VITE_API_URL);
		if (result.success) {
			const url = `${import.meta.env.VITE_API_URL}/api/products`;

			const { data } = await axios.post(url, {
				name: result.output.name,
				price: result.output.price,
				availability: result.output.availability,
				gender: result.output.gender,
				description: result.output.description,
				quantity: result.output.quantity,
				imageUrl: result.output.imageUrl,
				categoryId: result.output.categoryId,
				subcategoryId: result.output.subcategoryId,
			});
			console.log(data);
		} else {
			throw new Error('Datos no válidos');
		}
	} catch (error) {
		console.log(error);
	}
}
