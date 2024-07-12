import React from 'react'
import { IBlog } from '../../../types/blog'
import Image from 'next/image'
import { getDDMMYYYFormateDate } from '../../../utils/getDate'
import { CalendarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Blog(props: Omit<IBlog, 'description'>) {
    const { imageUrl, title, date, uniqueId } = props
    return (
        <Link href={`/blogs/${uniqueId}`} className='relative bg-white rounded-lg shadow-xl block h-full overflow-hidden cursor-pointer scale-100 transition duration-300 hover:scale-[1.02]'>
            <div className='flex flex-col'>
                <div className='overflow-hidden'>
                    <Image src={imageUrl} alt={title} width={300} height={300} className='h-full w-full object-cover' />
                </div>
                <div className='p-5 flex-1'>
                    <div className='flex flex-col justify-end h-full'>
                        {date && <p className='flex items-center gap-2 text-sm'><CalendarIcon height={18} className='text-brandSecondary' /> {getDDMMYYYFormateDate(date)}</p>}  </div>
                    <h2 className='mt-4 font-medium text-xl'>{title}</h2>
                </div>
            </div>
        </Link>
    )
}
