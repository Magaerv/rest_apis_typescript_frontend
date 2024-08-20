import {
	Link,
	Form,
	useActionData,
	redirect,
	ActionFunctionArgs,
	LoaderFunctionArgs,
	useLoaderData,
} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { getProductById, updateProduct } from '../services/ProductService.ts';
import { Product } from '../types/index.ts';

export async function loader({ params }: LoaderFunctionArgs) {
	if (params.id !== undefined) {
		const product = await getProductById(+params.id);
		if (!product) {
			throw new Response('', {
				status: 404,
				statusText: 'Producto no encontrado',
			});
		}
		return product;
	}
}

export async function action({ request, params }: ActionFunctionArgs) {
	const data = Object.fromEntries(await request.formData());
	let error = '';
	if (Object.values(data).includes('')) {
		error = 'Todos los campos son obligatorios';
	}
	if (error.length) {
		return error;
	}

	if (params.id !== undefined) {
		await updateProduct(data, +params.id);
		return redirect('/');
	}
}

const availabilityOptions = [
	{ name: 'Disponible', value: true },
	{ name: 'No Disponible', value: false },
];

const EditProduct = () => {
	const product = useLoaderData() as Product;
	const error = useActionData() as string;

	return (
		<>
			<div className='flex justify-between'>
				<h2 className='text-4xl font-black text-slate-500'>Editar Producto</h2>
				<Link
					to='/'
					className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
				>
					Volver a Productos
				</Link>
			</div>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Form className='mt-10' method='POST'>
				<div className='mb-4'>
					<label className='text-gray-800' htmlFor='name'>
						Nombre del Producto:
					</label>
					<input
						id='name'
						type='text'
						className='mt-2 block w-full p-3 bg-gray-50'
						placeholder='Nombre del Producto'
						name='name'
						defaultValue={product.name}
					/>
				</div>
				<div className='mb-4'>
					<label className='text-gray-800' htmlFor='price'>
						Precio:
					</label>
					<input
						id='price'
						type='number'
						className='mt-2 block w-full p-3 bg-gray-50'
						placeholder='Precio Producto. ej. 200, 300'
						name='price'
						defaultValue={product.price}
					/>
				</div>
				<div className='mb-4'>
					<label className='text-gray-800' htmlFor='availability'>
						Disponibilidad:
					</label>
					<select
						id='availability'
						className='mt-2 block w-full p-3 bg-gray-50'
						name='availability'
						defaultValue={product?.availability.toString()}
					>
						{availabilityOptions.map(option => (
							<option key={option.name} value={option.value.toString()}>
								{option.name}
							</option>
						))}
					</select>
				</div>
				<div className='mb-4'>
					<label className='text-gray-800' htmlFor='gender'>
						Género:
					</label>
					<select
						id='gender'
						className='mt-2 block w-full p-3 bg-gray-50'
						name='gender'
						defaultValue={product.gender}
					>
						<option value='femenino'>Femenino</option>
						<option value='masculino'>Masculino</option>
						<option value='unisex'>Unisex</option>
					</select>
				</div>
				<div className='mb-4'>
					<label className='text-gray-800' htmlFor='description'>
						Descripción:
					</label>
					<textarea
						id='description'
						className='mt-2 block w-full p-3 bg-gray-50'
						placeholder='Descripción del Producto'
						name='description'
						defaultValue={product.description}
					></textarea>
				</div>
				<div className='mb-4'>
					<label className='text-gray-800' htmlFor='quantity'>
						Cantidad:
					</label>
					<input
						id='quantity'
						type='number'
						className='mt-2 block w-full p-3 bg-gray-50'
						placeholder='Cantidad'
						name='quantity'
						defaultValue={product.quantity}
					/>
				</div>
				<div className='mb-4'>
					<label className='text-gray-800' htmlFor='imageUrl'>
						URL de la Imagen:
					</label>
					<input
						id='imageUrl'
						type='url'
						className='mt-2 block w-full p-3 bg-gray-50'
						placeholder='URL de la Imagen'
						name='imageUrl'
						defaultValue={product.imageUrl}
					/>
				</div>
				<div className='mb-4'>
					<label className='text-gray-800' htmlFor='categoryId'>
						ID de Categoría:
					</label>
					<input
						id='categoryId'
						type='number'
						className='mt-2 block w-full p-3 bg-gray-50'
						placeholder='ID de Categoría'
						name='categoryId'
						defaultValue={product.categoryId}
					/>
				</div>
				<div className='mb-4'>
					<label className='text-gray-800' htmlFor='subcategoryId'>
						ID de Subcategoría:
					</label>
					<input
						id='subcategoryId'
						type='number'
						className='mt-2 block w-full p-3 bg-gray-50'
						placeholder='ID de Subcategoría'
						name='subcategoryId'
						defaultValue={product.subcategoryId}
					/>
				</div>
				<input
					type='submit'
					className='mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded'
					value='Guardar Cambios'
				/>
			</Form>
		</>
	);
};

export default EditProduct;
