import Image from 'next/image'
import React from 'react'
import { IFeatureBlog } from '../../../types/blog'

export default function FeatureBlog({ imageUrl, title }: IFeatureBlog) {
    return (
        <div className='flex bg-gray-100 rounded-md'>
            <Image src={imageUrl} alt={title} width={200} height={200} className='flex-1 w-full h-full rounded-md' />
            <div className='p-8'>
                <h4>{title}</h4>
            </div>
        </div>
    )
}
