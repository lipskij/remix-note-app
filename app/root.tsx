import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import Navbar from "~/components/Navbar";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Notes Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <Navbar />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const coughtResponse = useCatch();

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
        <title>{coughtResponse.statusText}</title>
      </head>
      <body>
        <header>
          <Navbar />
        </header>
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
          <h1>{coughtResponse.statusText}</h1>
          <p>{coughtResponse.data?.message || "Oops, something went wrong."}</p>
          <p>
            Back to <Link to='/'>safety</Link>!
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        <header>
          <Navbar />
        </header>
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
          <h1>An error occurred!</h1>
          <p>{error.message}</p>
          <p>
            Back to <Link to='/'>safety</Link>!
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
