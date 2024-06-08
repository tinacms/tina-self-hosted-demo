import Image from 'next/image'
import React from 'react'
import { IProduct } from '../../../types/product'
import Link from 'next/link'

export default function Product(props: IProduct) {
    const { description, id, imageUrl, title } = props
    return (
        <div className='p-12 flex flex-col gap-8 bg-gray-100'>
            <Image src={imageUrl} height={600} width={400} alt={title} className='m-auto'/>
            <div className=' flex-1 flex flex-col gap-6 justify-between'>
                <h2 className='text-3xl font-bold tracking-wide'>{title}</h2>
                <p className='text-gray-600'>{description}</p>
                <Link href={`/product/${id}`} className='rounded-full w-56 p-2.5 border-2 border-brandSecondary font-bold text-center text-sm tracking-wide hover:border-black'>Discover The Product</Link>
            </div>

        </div >
    )
}
