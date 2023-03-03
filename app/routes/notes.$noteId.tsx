import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { deleteNoteById, getStoredNotes } from "~/data/notes";

export const action = async ({ params, request }: ActionArgs) => {
  const form = await request.formData();
  if (form.get("intent") !== "delete") {
    throw new Response(`The intent ${form.get("intent")} is not supported`, {
      status: 400,
    });
  }

  await deleteNoteById(params.noteId);
  return redirect("/notes");
};

const NoteDetailsPage: React.FC = () => {
  const note = useLoaderData();
  return (
    <main
      id='note-details'
      className='
    max-w-2xl
    m-auto
    mt-10
    p-4
    items-center
    text-gray-700
    text-center
    bg-blue-100
    rounded-md
    animate-fade-slide-in
    '
    >
      <header>
        <nav
          className='
        mt-4
        ml-0
        mb-4
        mr-0
        '
        >
          <Link
            className='
          text-gray-700
          p-2
          hover:text-gray-500
          '
            to='/notes'
          >
            Back to all notes
          </Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p
        className='
      text-gray-700
      text-xl
      pre-wrap
      '
      >
        {note.content}
      </p>

      <div>
        <Form method='post'>
          <button
            name='intent'
            type='submit'
            value='delete'
            className='
          p-2
          bg-red-500
          rounded-md
          mt-4
          text-white
          hover:shadow-lg
          hover:scale-105
          duration-200
          '
          >
            Delete
          </button>
        </Form>
      </div>
    </main>
  );
};

export async function loader({ params }: any) {
  const notes = await getStoredNotes();
  const selectedNote = notes.find(
    (note: { id: string; title: string; content: string }) =>
      note.id === params.noteId
  );

  if (!selectedNote) {
    throw json(
      { message: "Could not found note for id" + params.noteId },
      { status: 404, statusText: "Not Found" }
    );
  }
  return selectedNote;
}

export function meta({ data }: { data: { title: string } }) {
  return {
    title: data.title,
    description: "Manage your notes with ease.",
  };
}

export default NoteDetailsPage;
