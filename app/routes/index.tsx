import { Link } from "@remix-run/react";

const Index: React.FC = () => {
  return (
    <main id='content' className='text-center p-10'>
      <h1 className='text-gray-700 text-4xl p-4'>Keep track of your notes</h1>
      <p className='text-gray-700 text-2xl p-4'>
        Try our early beta never loose track of your notes again!
      </p>
      <p
        id='cta'
        className='text-gray-700 text-2xl p-4  hover:scale-105 transi ease-out duration-200'
      >
        <Link
          className='bg-gray-200 p-2 border-solid border-gray-700 border-2 rounded-lg hover:shadow-xl hover:bg-orange-200'
          to='/notes'
        >
          Try Now!
        </Link>
      </p>
    </main>
  );
};

export default Index;
