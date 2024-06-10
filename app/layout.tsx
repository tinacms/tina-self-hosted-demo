import Navbar from "../components/layout/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../components/layout/footer";
import { cn } from "../utils/cn";
import { client } from "../tina/__generated__/databaseClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Self Hosted Tina App",
  description: "A Next.js app with TinaCMS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navbarResponse = await client.queries.home({ relativePath: "home.md" })
  const footerResponse = await client.queries.footer({ relativePath: 'footer.md' })
  return (
    <html lang="en">
      <body className={cn(inter.className, 'relative')}>
        <Navbar data={navbarResponse.data} query={navbarResponse.query} variables={navbarResponse.variables} />
        {children}
        <Footer data={footerResponse.data} query={footerResponse.query} variables={footerResponse.variables} />
      </body>
    </html>
  );
}
