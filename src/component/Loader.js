import * as Loader from 'react-loader-spinner';

export default function ReactLoader() {
  return (
    <div className='flex justify-center mt-12'>
     <Loader.ColorRing/>
    </div>
  );
}