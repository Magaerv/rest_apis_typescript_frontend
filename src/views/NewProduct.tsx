import {
	Link,
	Form,
	useActionData,
	ActionFunctionArgs,
	redirect,
} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { addProduct } from '../services/ProductService.ts';

export async function action({ request }: ActionFunctionArgs) {
	const data = Object.fromEntries(await request.formData());
	let error = '';
	if (Object.values(data).includes('')) {
		error = 'Todos los campos son obligatorios';
	}
	if (error.length) {
		return error;
	}
	await addProduct(data);
	return redirect('/');
}

const NewProduct = () => {
	const error = useActionData() as string;

	return (
		<>
			<div className='flex justify-between'>
				<h2 className='text-4xl font-black text-slate-500'>
					Registrar Producto
				</h2>
				<Link
					to='/'
					className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
				>
					Volver a Productos
				</Link>
			</div>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Form className='mt-10' method='POST' action=''>
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
					>
						<option value='true'>Disponible</option>
						<option value='false'>No disponible</option>
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
					/>
				</div>
				<input
					type='submit'
					className='mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded'
					value='Registrar Producto'
				/>
			</Form>
		</>
	);
};

export default NewProduct;
