import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";

const NoteDetailsPage: React.FC = () => {
  const note = useLoaderData();
  return (
    <main
      id='note-details'
      className='
    m-auto
    mt-10
    max-w-2xl
    animate-fade-slide-in
    items-center
    rounded-md
    bg-blue-100
    p-4
    text-center
    text-gray-700
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
          p-2
          text-gray-700
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
      pre-wrap
      text-xl
      text-gray-700
      '
      >
        {note.content}
      </p>
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
