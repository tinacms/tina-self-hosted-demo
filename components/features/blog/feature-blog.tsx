import Image from 'next/image'
import React from 'react'
import { IFeatureBlog } from '../../../types/blog'

export default function FeatureBlog({ imageUrl, title }: IFeatureBlog) {
    return (
        <div className='flex sm:flex-row flex-col bg-gray-100 items-center rounded-md flex-wrap'>
            <Image src={imageUrl} alt={title} width={150} height={150} className='flex-1 w-full h-full rounded-md' />
            <div className='p-8'>
                <h4>{title}</h4>
            </div>
        </div>
    )
}
