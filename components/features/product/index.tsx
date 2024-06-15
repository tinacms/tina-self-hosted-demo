import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { ProductQuery } from '../../../tina/__generated__/types'
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function Product(props: ProductQuery['product']) {
    const { uniqueId, productImages, title, overviewDescription } = props
    return (
        <div className='p-12 flex flex-col gap-8 bg-gray-100 rounded-md'>
            <Image src={productImages?.[0] || ''} height={600} width={400} alt={title || ''} className='m-auto' />
            <div className=' flex-1 flex flex-col gap-8 justify-between'>
                <h2 className='text-4xl font-bold tracking-wide'>{title}</h2>
                <TinaMarkdown content={overviewDescription} />
                <Link href={`/products/${uniqueId}`} className='rounded-md w-fit px-6 py-2   bg-brandSecondary text-white font-bold text-center text-sm tracking-wide border-2 border-transparent hover:border-black hover:bg-transparent hover:text-black'>Discover The Product</Link>
            </div>
        </div >
    )
}
