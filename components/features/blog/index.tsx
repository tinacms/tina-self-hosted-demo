import React from 'react'
import { IBlog } from '../../../types/blog'
import Image from 'next/image'
import { getDDMMYYYFormateDate } from '../../../utils/getDate'
import { CalendarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Blog(props: IBlog) {
    const { imageUrl, title, date, id } = props
    return (
        <Link href={`/blog/${id}`} className='relative block h-full overflow-hidden cursor-pointer'>
            <Image src={imageUrl} alt={title} width={300} height={300} className='h-full w-full object-cover hover:scale-125 transition-all duration-500' />
            <div className='absolute  p-4 bottom-0 text-white'>
                <div className='flex flex-col justify-end h-full'>
                    <h2 className='font-semibold text-lg'>{title}</h2>
                    <p className='flex items-center gap-2 text-sm'><CalendarIcon height={18} /> {getDDMMYYYFormateDate(date)}</p>
                </div>
            </div>
        </Link>
    )
}
