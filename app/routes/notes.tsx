import { json, redirect } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

const NotesPage: React.FC = () => {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
};

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: "No notes found" },
      { status: 404, statusText: "Not Found" }
    );
  }
  return notes;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData.entries());

  const title = noteData.title as string;
  const content = noteData.content as string;
  if (title.length < 5) {
    return {
      message: "Title is too short - must be at least 5 characters long",
    };
  }

  if (content.length < 5) {
    return {
      message: "Content is too short - must be at least 5 characters long",
    };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = [...existingNotes, noteData];
  await storeNotes(updatedNotes);
  return redirect("/notes");
}

export default NotesPage;

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function meta() {
  return {
    title: "All Notes",
    description: "Manage your notes with ease.",
  };
}

export function CatchBoundary() {
  const coughtResponse = useCatch();
  const message = coughtResponse.data?.message || "Data not found";
  return (
    <main>
      <NewNote />
      <p className='info-message'>{message}</p>
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main className='error'>
      <p>An error related to your notes occurred!</p>
      <p>{error.message}</p>
      <p>
        Back to <Link to='/'>safety</Link>!
      </p>
    </main>
  );
}
