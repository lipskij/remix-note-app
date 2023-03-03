import { Form, useActionData, useNavigation } from "@remix-run/react";

const NewNote: React.FC = () => {
  const data = useActionData();

  return (
    <Form
      method='post'
      id='note-form'
      className='max-w-lg m-auto mt-10 mb-10 shadow-xl border-solid border-gray-200 border-2 p-5 rounded'
    >
      {data?.message && <p className='text-red-500'>{data.message}</p>}
      <p>
        <label
          htmlFor='title'
          className='block text-center mb-2 text-gray-700 font-bold'
        >
          Title
        </label>
        <input
          type='text'
          name='title'
          id='title'
          required
          className='block text-center w-full p-2 bg-gray-300 rounded border-none'
        />
      </p>
      <p>
        <label
          htmlFor='content'
          className='block text-center mb-2 text-gray-700 font-bold'
        >
          Content
        </label>
        <textarea
          id='content'
          name='content'
          rows={5}
          required
          className='block text-center w-full p-2 bg-gray-300 rounded border-none'
        />
      </p>
      <div className='text-center mt-5'>
        <button
          name='intent'
          type='submit'
          value='create'
          className='disabled:bg-gray-300 disabled:cursor-not-allowed p-4 border-solid border-2 rounded-md text-gray-700 font-bold hover:scale-105 ease-out duration-200'
        >
          Add Note
        </button>
      </div>
    </Form>
  );
};

export default NewNote;
