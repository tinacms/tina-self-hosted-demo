import Image from 'next/image'
import Link from 'next/link'
import { ProductQuery } from '../../../tina/__generated__/types'
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function Product(props: ProductQuery['product']) {
    const { uniqueId, productImages, title, overviewDescription } = props
    return (
        <div className='h-full flex flex-col gap-8 bg-slate-100 border rounded-md transition duration-300 ease-in-out hover:scale-[1.02]'>
            <Image src={productImages?.[0] || ''} height={600} width={500} alt={title || ''} className='mt-10 mx-auto flex-1' />
            <div className='p-12 flex-1 flex flex-col gap-6 justify-between ' >
                <h2 className='text-4xl font-semibold'>{title}</h2>
                <div className='text-slate-500'>
                    <TinaMarkdown content={overviewDescription} />
                </div>

                <Link href={`/products/${uniqueId}`} className='rounded-full shadow-md w-fit px-6 py-2.5 transition duration-300 ease-in-out border-brandSecondary font-semibold text-center text-sm border-solid border-2 hover:bg-brandSecondary hover:text-white'>
                    Discover The Product
                </Link>
            </div>
        </div >
    )
}
