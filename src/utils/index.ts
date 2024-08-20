export function formatCurrency(amount: number) {
	return new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: 'ARS',
	}).format(amount);
}

export function toBoolean(str: string) {
	return str.toLowerCase() === 'true';
}
