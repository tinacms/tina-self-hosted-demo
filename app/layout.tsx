import Navbar from "../components/layout/navbar";
import { Inter } from "next/font/google";
import Footer from "../components/layout/footer";
import { cn } from "../utils/cn";
import { client } from "../tina/__generated__/databaseClient";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RTecg- New Generation Automation Company",
  description: "RTech is well known for there services in automation sector and had great history of successful projects",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navbarResponse = await client.queries.navbar({ relativePath: "navbar.md" })
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
