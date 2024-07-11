import Link from 'next/link';
import React from 'react'
import { cn } from '../../utils/cn';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';

export interface IBreadcrumbListItem {
  name: string;
  link?: string;
}
export interface IBreadcrumb {
  list: IBreadcrumbListItem[]
}
export default function Breadcrumb({ list }: IBreadcrumb) {
  return (
    <div className='flex gap-2 items-center'>
      <div>
        <a href="/" className="text-gray-400 hover:text-gray-500">
          <HomeIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
          <span className="sr-only">Home</span>
        </a>
      </div>
      {
        list.map((breadcrumbItem, index) =>

          <div key={breadcrumbItem.name} className="flex gap-2 justify-between items-center">
            <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
            {
              breadcrumbItem.link ? <Link href={breadcrumbItem.link} className='hover:underline text-gray-500 hover:text-gray-700'> {breadcrumbItem.name}</Link> : breadcrumbItem.name
            }

          </div>
        )
      }
    </div>
  )
}
