type Props = {
   children: React.ReactNode
}

export default function Card({ children }: Props) {
   return (
      <div className='my-4 rounded-xl bg-slate-50 p-4 shadow-md'>
         {children}
      </div>
   )
}
