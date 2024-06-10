'use client'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

export default function ToggleMenuIcon() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const handleMobileMenuToggle = () => {
        const mobileMenu = document.getElementById('mobile-menu')
        if (mobileMenu) {
            setIsMobileMenuOpen(!isMobileMenuOpen)
            if (mobileMenu.classList.contains('show_Mobile_Menu')) {
                mobileMenu.classList.remove('show_Mobile_Menu');
            } else {
                mobileMenu.classList.add('show_Mobile_Menu');
            }
        }
    }
    return (
        <button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false" onClick={handleMobileMenuToggle}>
            {isMobileMenuOpen && <XMarkIcon className="block h-6 w-6" aria-hidden="true" id="close" />}
            {!isMobileMenuOpen && <Bars3Icon className="block h-6 w-6" aria-hidden="true" id="open" />}
        </button>
    )
}
