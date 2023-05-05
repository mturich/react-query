import axios from 'axios';
import { useEffect, useState } from 'react';
import z from 'zod';
import Loading from './Loading';
import ErrorPage from './error-page';
// ----------------------------------------------------------------------

type AsyncState = 'ideal' | 'loading' | 'succeeded' | "failed"

const schema = z.array(z.object({
	name: z.string(),
	height: z.string().transform(string => Number(string)),
	mass: z.string().transform(string => Number(string)),
}))

type Data = z.infer<typeof schema>
// ----------------------------------------------------------------------


function Axios() {
	const [isFetching, setIsFetching] = useState<AsyncState>('ideal')
	const [data, setData] = useState<Data | undefined>()

	useEffect(() => {
		const getData = async () => {
			setIsFetching('loading')
			try {
				const res = await axios.get('https://swapi.dev/api/people/')

				if (res.statusText === "OK") {
					const parsed = schema.parse(res.data.results)
					console.dir(parsed)
					setIsFetching('succeeded')
					setData(parsed)
				}
			} catch (e) {
				setIsFetching('failed')
			}
		}
		getData()

		return () => { setIsFetching('succeeded') }
	}, [])

	if (isFetching === 'loading') return <Loading />
	if (isFetching === 'failed') return <ErrorPage />

	return (

		// <div className='grid grid-cols-4 gap-4 m-4 basis-20'>
		<div className='grid gap-4 m-4 grid-cols-autofit-200'>

			{data && data.map(el => (
				<div key={el.name} className='p-6 text-center shadow-lg bg-slate-100 rounded-xl'>
					<p>{el.name}</p>
					<p className='text-sm font-thin'>height: {el.height}</p>
					<p className='text-sm font-thin'>mass: {el.mass}</p>
				</div>
			))}



		</div >
	)
}

export default Axios
