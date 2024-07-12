import Image from "next/image";
import Link from "next/link";
import ActiveNavLink from "./components/active-link";
import ToggleMenuIcon from "./components/toggle-menu-icon";
import { NavbarQuery } from "../../../tina/__generated__/types";
import Button from "../../button";

export default function Navbar(props: {
    data: NavbarQuery;
    variables: object;
    query: string;
}) {
    const { logo, menu: menus } = props.data.navbar
    return (
        <nav className="bg-white shadow fixed top-0 w-full z-10">
            <div className="pl-0  pr-2 sm:px-0">
                <div className="container mx-auto flex h-20 justify-between">
                    <div className="flex">
                        <Link href='/' className="flex flex-shrink-0 items-center cursor-pointer">
                            <Image src={logo || ''} alt="RTech Company Logo" className="h-16 w-auto" width={100} height={100} />
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        {
                            menus?.map((menu) => menu && <ActiveNavLink
                                key={menu.label}
                                link={menu.link || ''}
                                className='inline-flex items-center  px-1 pt-1 font-medium text-gray-500 transition duration-700 ease-in-out border-b-2 border-white hover:border-b-2 hover:border-brandSecondary'
                                activeClassName='border-b-2 border-brandSecondary text-gray-800'
                            >
                                {menu.label}
                            </ActiveNavLink>)
                        }
                    </div>
                    <Link href='/contact-us' className="hidden sm:ml-6 sm:flex sm:items-center">
                        <Button type="button" className="text-md  p-2 capitalize ">
                            get a demo
                        </Button>
                    </Link>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <ToggleMenuIcon />
                    </div>
                </div>
            </div>

            <div className='hidden min-h-screen border-t' id="mobile-menu">
                <div className="mt-12 divide-y-2 divide-gray-100">
                    {
                        menus?.map((menu) => menu && <ActiveNavLink
                            key={menu.label}
                            link={menu.link || ''}
                            className="block px-5 py-6 text-2xl font-medium"
                            activeClassName='border-brandSecondary border-l-4'
                        >
                            {menu.label}
                        </ActiveNavLink>)
                    }
                </div>
                <div className="border-t border-gray-200 py-6">
                    <div className="flex items-center px-3">
                        <Button type="button" className="w-full text-md p-2 capitalize">
                            get a demo
                        </Button>
                    </div>
                </div>
            </div>
        </nav>

    )
}