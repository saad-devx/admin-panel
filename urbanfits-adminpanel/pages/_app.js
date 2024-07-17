import '@/styles/globals.css'
import dynamic from 'next/dynamic';

function App({ Component }) {


  // return <div className='bg-red-600 animate-pulse'>
  //   <Component />
  // </div>
}
export default dynamic(() => Promise.resolve(App), { ssr: false })