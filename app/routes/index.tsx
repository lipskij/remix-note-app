import { Link } from "@remix-run/react";
import homeStyles from "~/styles/home.css";

const Index: React.FC = () => {
  return (
    <main id='content'>
      <h1>Keep track of your notes</h1>
      <p>Try our early beta never loose track of your notes again!</p>
      <p id='cta'>
        <Link to='/notes'>Try Now!</Link>
      </p>
    </main>
  );
};

export default Index;

export function links() {
  return [{ rel: "stylesheet", href: homeStyles }];
}
