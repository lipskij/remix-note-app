import { json, redirect } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import NewNote from "~/components/NewNote";
import NoteList from "~/components/NoteList";
import { deleteNoteById, getStoredNotes, storeNotes } from "~/data/notes";

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

  if (formData.get("intent") === "delete") {
    const noteId = Object.fromEntries(formData.entries());

    if (!noteId.id) {
      throw new Response(`Note that you want to delete is not found.`, {
        status: 400,
      });
    }
    await deleteNoteById(noteId.id as string);
    return redirect("/notes");
  }

  if (formData.get("intent") === "create") {
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
  return redirect("/notes");
}

export default NotesPage;

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
      <p
        className='
      m-4
      text-center
      text-gray-700
      text-xl
      '
      >
        {message}
      </p>
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main
      className='
    max-w-2xl
    m-auto
    mt-10
    p-4
    text-center
    bg-orange-100
    rounded-md
    shadow-md
    '
    >
      <p>An error related to your notes occurred!</p>
      <p>{error.message}</p>
      <p>
        Back to <Link to='/'>safety</Link>!
      </p>
    </main>
  );
}
