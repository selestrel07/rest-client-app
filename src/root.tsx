import { Links, Outlet, Scripts, ScrollRestoration } from "react-router";
import { Footer } from "@components";

export default function Root() {
  return (
    <html lang="en">
    <head>
      <title>Yagni Rest Client App</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Links/>
    </head>
    <body>
      <main className="min-h-[calc(100vh-36px)] flex items-center justify-center">
        <Outlet/>
      </main>
      <Footer/>
      <ScrollRestoration/>
      <Scripts/>
    </body>
    </html>
  )
}