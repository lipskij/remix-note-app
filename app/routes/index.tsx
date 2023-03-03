import { Link } from "@remix-run/react";

const Index: React.FC = () => {
  return (
    <main id='content' className='p-10 text-center'>
      <h1 className='p-4 text-4xl text-gray-700'>Keep track of your notes</h1>
      <p className='p-4 text-2xl text-gray-700'>
        Try our early beta never loose track of your notes again!
      </p>
      <p
        id='cta'
        className='transi p-4 text-2xl  text-gray-700 duration-200 ease-out hover:scale-105'
      >
        <Link
          className='rounded-lg border-2 border-solid border-gray-700 bg-gray-200 p-2 hover:bg-orange-200 hover:shadow-xl'
          to='/notes'
        >
          Try Now!
        </Link>
      </p>
    </main>
  );
};

export default Index;
