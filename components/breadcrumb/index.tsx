import Link from 'next/link';
import React from 'react'
import { cn } from '../../utils/cn';

export interface IBreadcrumbListItem {
  name: string;
  link?: string;
}
export interface IBreadcrumb {
  list: IBreadcrumbListItem[]
}
export default function Breadcrumb({ list }: IBreadcrumb) {
  return (
    <div className='flex gap-2'>
      {
        list.map((breadcrumbItem, index) =>
          <div key={breadcrumbItem.name} className={cn('flex gap-2 justify-between items-center', list.length - 1 !== index ? 'text-gray-600' : 'text-black')}>
            {
              breadcrumbItem.link ? <Link href={breadcrumbItem.link} className='hover:underline'> {breadcrumbItem.name}</Link> : breadcrumbItem.name
            }
            {list.length - 1 !== index && <span>/</span>}
          </div>
        )
      }
    </div>
  )
}
