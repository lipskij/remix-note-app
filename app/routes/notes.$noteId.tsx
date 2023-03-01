import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";
import styles from "~/styles/note-details.css";

const NoteDetailsPage: React.FC = () => {
  const note = useLoaderData();
  return (
    <main id='note-details'>
      <header>
        <nav>
          <Link to='/notes'>Back to all notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p className='note-details-content'>{note.content}</p>
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

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function meta({ data }: { data: { title: string } }) {
  return {
    title: data.title,
    description: "Manage your notes with ease.",
  };
}

export default NoteDetailsPage;
