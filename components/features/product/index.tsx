import Image from 'next/image'
import Link from 'next/link'
import { ProductQuery } from '../../../tina/__generated__/types'
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function Product(props: ProductQuery['product']) {
    const { uniqueId, productImages, title, overviewDescription } = props
    return (
        <div className='p-12 h-full flex flex-col gap-8 bg-gray-100 rounded-md '>
            <Image src={productImages?.[0] || ''} height={600} width={400} alt={title || ''} className='m-auto transition scale-1 hover:scale-105 duration-200 ease-in-out flex-1' />
            <div className=' flex-1 flex flex-col gap-8 justify-between ' >
                <h2 className='text-4xl font-semibold tracking-wide'>{title}</h2>
                <div className='text-gray-600'>
                    <TinaMarkdown content={overviewDescription} />
                </div>

                <Link href={`/products/${uniqueId}`} className='rounded-full shadow w-fit px-6 py-2.5 transition duration-300 ease-in-out border-brandSecondary font-semibold text-center text-sm border-solid border-2  hover:bg-transparent hover:scale-110  '>
                    Discover The Product
                </Link>
            </div>
        </div >
    )
}
