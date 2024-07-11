import ProductDisclosures, { IProductDisclosure } from './_components/product-disclosures'
import { client } from '../../../tina/__generated__/databaseClient'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import ProductImageSlider from './_components/product-image-slider'
import Breadcrumb from '../../../components/breadcrumb'
import AddToCartButton from './_components/add-to-cart-button'

export default async function ProductDetails(props: { params: { productId: string } }) {

    const { params: { productId } } = props
    //making request to product  
    const res = await client.queries.product({ relativePath: `${productId}.md` });
    const product = res.data.product
    const disclosures = product.disclosures?.reduce((acc: IProductDisclosure[], disclosure) => {
        if (disclosure?.title && disclosure.features && disclosure.features.length !== 0) {
            acc.push({ title: disclosure.title, features: disclosure.features });
        }
        return acc;
    }, []) || []
    const productImages = product.productImages?.map((image) => image || '') || []
    return (
        <div className="bg-white container mx-auto min-h-screen pt-32">
            <div className="px-4  sm:px-6 lg:px-8">
                <div className="mb-16 flex">
                    <Breadcrumb list={[
                        { name: 'Products', link: '/products' },
                        { name: product.title || '' }
                    ]} />
                </div>
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-14">
                    {/* Image gallery */}
                    <ProductImageSlider images={productImages} />

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-4xl font-bold tracking-tight ">{product.title}</h1>
                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                        </div>
                        <div className="mt-6 text-gray-600">
                            <h3 className="sr-only">Description</h3>
                            <TinaMarkdown content={product.description} />
                        </div>
                        <section aria-labelledby="details-heading" className='mt-8' >
                            <h2 id="details-heading" className="sr-only">
                                Additional details
                            </h2>
                            <ProductDisclosures disclosures={disclosures} />
                        </section>
                        <div className="mt-16 flex">
                            <AddToCartButton product={JSON.parse(JSON.stringify(product))} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
