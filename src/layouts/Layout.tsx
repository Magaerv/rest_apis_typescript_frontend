import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<header className='bg-slate-800'>
				<div className='mx-auto max-w-6xl py-5'>
					<h1 className='text-3xl font-extrabold text-white'>
						Administrador de Productos
					</h1>
				</div>
			</header>
			<Outlet />
		</>
	);
};

export default Layout;
