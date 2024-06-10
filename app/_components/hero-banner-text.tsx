import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

export default function HeroBannerText() {
    return (
        <div className='absolute left-0  w-full h-full top-0 flex items-center'>
            <div className='mx-auto container'>
                <div className=' w-full md:w-1/2 flex flex-col gap-8 text-center md:text-start'>
                    <h1 className='font-bold text-xl sm:text-4xl lg:text-6xl   tracking-wide'>Automation Solutions for Smarter Manufacturing</h1>
                    <p className='tracking-wide text-gray-600 hidden md:block'>At RTECH, we specialize in manufacturing automated equipment for medical device manufacturing, providing fast and reliable solutions that you can trust. Our cutting-edge technology ensures that your medical devices are produced with accuracy and precision.</p>
                    <Link href='/'><span className='font-bold flex gap-2 items-center hover:opacity-80 justify-center md:justify-start'> Learn More <ChevronRightIcon height={18} /></span></Link>
                </div>
            </div>
        </div>
    )
}
