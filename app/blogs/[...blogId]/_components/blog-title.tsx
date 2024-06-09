import { CalendarIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { getDDMMYYYFormateDate } from '../../../../utils/getDate';

interface IBlogTitle {
    title: string;
    date: Date;
    tags: string[]
}
export default function BlogTitle({ date, tags, title }: IBlogTitle) {
    return (
        <div>
            <h1 className='text-6xl font-bold text-white  tracking-wide	mb-8'>{title}</h1>
            <div className='flex  items-center text-white w-full gap-4 font-semibold capitalize'>
                <p className='flex items-center gap-2'><CalendarIcon height={18}/> {getDDMMYYYFormateDate(date)}</p>
                {
                    tags.map((tag, index) => <p key={index} className='flex items-center gap-2'><CalendarIcon height={18}/> {tag}</p>)
                }
            </div>
        </div>
    )
}
