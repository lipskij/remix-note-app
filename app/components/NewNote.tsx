import { Form, useActionData, useNavigation } from "@remix-run/react";
import styles from "~/components/NewNote.css";

const NewNote: React.FC = () => {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method='post' id='note-form'>
      {data?.message && <p className='error'>{data.message}</p>}
      <p>
        <label htmlFor='title'>Title</label>
        <input type='text' name='title' id='title' required />
      </p>
      <p>
        <label htmlFor='content'>Content</label>
        <textarea id='content' name='content' rows={5} required />
      </p>
      <div className='form-actions'>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
};

export default NewNote;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
