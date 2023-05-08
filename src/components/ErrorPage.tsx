import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError() as Error;
	let errorMessage: string;

	if (isRouteErrorResponse(error)) {
		// error is type `ErrorResponse`
		errorMessage = error.error?.message || error.statusText;
	} else if (error instanceof Error) {
		errorMessage = error.message;
	} else if (typeof error === 'string') {
		errorMessage = error;
	} else {
		console.error(error);
		errorMessage = 'An unknown error occurred';
	}

	return (
		<div id='error-page' className='flex flex-col items-center justify-center h-screen gap-8'>
			<h1 className='text-4xl font-bold'>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p className='text-slate-400'>
				<i>{errorMessage}</i>
			</p>

			<button className="px-5 py-1.5 rounded-2xl hover:underline bg-slate-100"><Link to={'/'} > Home</Link></button>
		</div>
	);
}
export default ErrorPage

