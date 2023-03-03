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
    flex
    flex-wrap
    justify-center
    gap-5
    m-auto
    max-w-5xl
    h-56
    text-gray-700
    '
    >
      {notes.map((note, index) => (
        <li
          key={note.id}
          className='
        w-2/5
        bg-blue-100
        text-gray
        shadow-md
        p-4
        rounded-md
        animate-fade-in
        hover:bg-blue-200
        hover:translate-y-1
        ease-in duration-200
        '
        >
          <Link prefetch='intent' to={note.id}>
            <article>
              <header>
                <ul
                  className='
                flex
                p-0
                justify-between
                items-center
                text-gray-500
                font-bold
                pb-4
                mb-4
                border-b
                border-gray-500
                m-0'
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
              m-0
              text-gray-700
              nowrap
              overflow-hidden
              text-overflow-ellipsis
              w-full
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
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
