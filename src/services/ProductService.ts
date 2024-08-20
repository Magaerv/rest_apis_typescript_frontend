import { safeParse } from 'valibot';
import axios from 'axios';
import {
	DraftProductSchema,
	ProductsSchema,
	Product,
	ProductSchema,
} from '../types';
import { toBoolean } from '../utils';

type ProductData = {
	[k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
	try {
		const result = safeParse(DraftProductSchema, {
			name: data.name,
			price: +data.price,
			gender: data.gender,
			availability: data.availability === 'true' ? true : false,
			description: data.description,
			quantity: +data.quantity,
			imageUrl: data.imageUrl,
			categoryId: +data.categoryId,
			subcategoryId: +data.subcategoryId,
		});
		console.log(result);
		if (result.success) {
			const url = `${import.meta.env.VITE_API_URL}/api/products`;

			const { data } = await axios.post(url, {
				name: result.output.name,
				price: result.output.price,
				gender: result.output.gender,
				availability: result.output.availability,
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

export async function getProducts() {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/products`;
		const { data } = await axios(url);
		const result = safeParse(ProductsSchema, data.data);
		if (result.success) {
			return result.output;
		} else {
			throw new Error('Hubo un error...');
		}
	} catch (error) {
		console.log(error);
	}
}

export async function getProductById(id: Product['id']) {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
		const { data } = await axios(url);
		const result = safeParse(ProductSchema, data.data);
		if (result.success) {
			return result.output;
		} else {
			throw new Error('Hubo un error...');
		}
	} catch (error) {
		console.log(error);
	}
}

export async function updateProduct(data: ProductData, id: Product['id']) {
	try {
		const result = safeParse(ProductSchema, {
			id,
			name: data.name,
			price: +data.price,
			availability: toBoolean(data.availability.toString()),
			gender: data.gender,
			description: data.description,
			quantity: +data.quantity,
			imageUrl: data.imageUrl,
			categoryId: +data.categoryId,
			subcategoryId: +data.subcategoryId,
		});
		if (result.success) {
			const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;

			await axios.put(url, result.output);
		}
	} catch (error) {
		console.log(error);
	}
}

export async function deleteProduct(id: Product['id']) {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
		await axios.delete(url);
	} catch (error) {
		console.log(error);
	}
}

export async function updateProductAvailability(id: Product['id']) {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
		await axios.patch(url);
	} catch (error) {
		console.log(error);
	}
}
