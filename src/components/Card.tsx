import { Data } from "../pages/Axios";

export default function Card({ item }: { item: Data }) {
	return (
		<div className='p-6 text-center shadow-lg bg-slate-100 rounded-xl'>
			<p>{item.name}</p>
			<p className='text-sm font-thin'>height: {item.height}</p>
			<p className='text-sm font-thin'>mass: {item.mass}</p>
		</div>
	)
}
