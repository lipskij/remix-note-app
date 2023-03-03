import { Form, Link } from "@remix-run/react";

interface NoteProps {
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
}

const NoteList: React.FC<NoteProps> = ({ notes }) => {
  return (
    <ul
      id='note-list'
      className='
    m-auto
    flex
    h-56
    max-w-5xl
    flex-wrap
    justify-center
    gap-5
    text-gray-700
    '
    >
      {notes.map((note, index) => (
        <li
          key={note.id}
          className='
        text-gray
        w-2/5
        animate-fade-in
        rounded-md
        bg-blue-100
        p-4
        shadow-md
        duration-200
        ease-in
        hover:translate-y-1 hover:bg-blue-200
        '
        >
          <Link prefetch='intent' to={note.id}>
            <article>
              <header>
                <ul
                  className='
                m-0
                mb-4
                flex
                items-center
                justify-between
                border-b
                border-gray-500
                p-0
                pb-4
                font-bold
                text-gray-500'
                >
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={note.id}>
                      {new Date(note.id).toLocaleDateString("lt-LT", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </li>
                </ul>
                <h2
                  className='
                m-2
                text-gray-700
                '
                >
                  {note.title}
                </h2>
              </header>
              <p
                className='
              nowrap
              text-overflow-ellipsis
              m-0
              w-full
              overflow-hidden
              text-gray-700
              '
              >
                {note.content}
              </p>
            </article>
          </Link>
          <div>
            <Form method='post'>
              <input type='hidden' name='id' value={note.id} />
              <button
                name='intent'
                type='submit'
                value='delete'
                className='
          mt-4
          rounded-md
          bg-red-500
          p-2
          text-white
          duration-200
          hover:scale-105
          hover:shadow-lg
          '
              >
                Delete
              </button>
            </Form>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
