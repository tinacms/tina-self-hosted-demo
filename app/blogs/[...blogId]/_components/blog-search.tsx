import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function BlogSearch() {
    return (
        <div>
            <div className="relative mt-2 flex items-center">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder='Search Blog'
                    className="block w-full  border-0 px-3 py-2 pr-8 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6 bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-brandSecondary focus:outline-0"
                />
                <div className="absolute inset-y-0 right-1 flex py-1.5 pr-1.5 top-1">
                    <MagnifyingGlassIcon height={20} />
                </div>
            </div>
        </div>
    )
}
