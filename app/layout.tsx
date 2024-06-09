import cn from "classnames";
import Navbar, { IMenu } from "../components/layout/navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Self Hosted Tina App",
  description: "A Next.js app with TinaCMS",
};

const menus: IMenu[] = [
  {
    label: 'Home',
    link: '/'
  },
  {
    label: 'Products',
    link: '/products'
  },
  {
    label: 'Services',
    link: '/services'
  },
  {
    label: 'Contact Us',
    link: '/contact-us'
  },
]
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className ,'relative')}>
        <Navbar logo="/logo.webp" menus={menus} />
        {children}
      </body>
    </html>
  );
}
