
'use client'
import Image from "next/image";
import Link from "next/link";
import ActiveNavLink from "./components/active-link";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from "react";
import { cn } from "../../../utils/cn";

export interface IMenu {
    label: string;
    link: string
}

interface INavbar {
    logo: string;
    menus: IMenu[];
}
export default function Navbar({ logo, menus }: INavbar) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen)
    return (
        <nav className="bg-white shadow fixed top-0 w-full z-10">
            <div className="mx-auto container pl-0  pr-2 sm:px-0">
                <div className="flex h-20 justify-between">
                    <div className="flex">
                        <Link href='/' className="flex flex-shrink-0 items-center cursor-pointer">
                            <Image src={logo} alt="RTech Company Logo" width={100} height={100} />
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {
                                menus.map((menu) => <ActiveNavLink
                                    key={menu.label}
                                    link={menu.link}
                                    className='inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-white hover:border-b-2 hover:border-brandSecondary'
                                    activeClassName='border-b-2 border-brandSecondary'
                                >
                                    {menu.label}
                                </ActiveNavLink>)
                            }
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <button type="button" className="rounded-md text-md bg-brandSecondary text-white p-2 capitalize hover:opacity-90">
                            get a demo
                        </button>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false" onClick={handleMobileMenuToggle} >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen && <XMarkIcon className="block h-6 w-6" aria-hidden="true" id="close" />}
                            {!isMobileMenuOpen && <Bars3Icon className="block h-6 w-6" aria-hidden="true" id="open" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className={cn('sm:hidden', isMobileMenuOpen ? 'block' : 'hidden')} id="mobile-menu">
                <div className="space-y-1 pb-3 pt-2">
                    {
                        menus.map((menu) => <ActiveNavLink
                            key={menu.label}
                            link={menu.link}
                            className="block py-2 pl-3 pr-4 text-base font-medium"
                            activeClassName='border-indigo-500 text-indigo-700 border-l-4'
                        >
                            {menu.label}
                        </ActiveNavLink>)
                    }
                </div>
                <div className="border-t border-gray-200 pb-3 pt-4">
                    <div className="flex items-center px-4">
                        <button type="button" className="relative ml-auto flex-shrink-0  bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 capitalize">
                            get a demo
                        </button>
                    </div>
                </div>
            </div>
        </nav>

    )
}
