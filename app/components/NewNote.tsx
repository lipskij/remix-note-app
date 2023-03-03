import { Form, useActionData, useNavigation } from "@remix-run/react";

const NewNote: React.FC = () => {
  const data = useActionData();

  return (
    <Form
      method='post'
      id='note-form'
      className='m-auto mt-10 mb-10 max-w-lg rounded border-2 border-solid border-gray-200 p-5 shadow-xl'
    >
      {data?.message && <p className='text-red-500'>{data.message}</p>}
      <p>
        <label
          htmlFor='title'
          className='mb-2 block text-center font-bold text-gray-700'
        >
          Title
        </label>
        <input
          type='text'
          name='title'
          id='title'
          required
          className='block w-full rounded border-none bg-gray-300 p-2 text-center'
        />
      </p>
      <p>
        <label
          htmlFor='content'
          className='mb-2 block text-center font-bold text-gray-700'
        >
          Content
        </label>
        <textarea
          id='content'
          name='content'
          rows={5}
          required
          className='block w-full rounded border-none bg-gray-300 p-2 text-center'
        />
      </p>
      <div className='mt-5 text-center'>
        <button
          name='intent'
          type='submit'
          value='create'
          className='
          rounded-md
           border-2
           border-solid p-4
           font-bold
           text-gray-700
         duration-200
           ease-out hover:scale-105
           hover:shadow-xl disabled:cursor-not-allowed
           disabled:bg-gray-300
          '
        >
          Add Note
        </button>
      </div>
    </Form>
  );
};

export default NewNote;
