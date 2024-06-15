import React from 'react'
import { client } from '../../tina/__generated__/databaseClient'
import Product from '../../components/features/product';

export default async function Products() {
    const productsConnection = await client.queries.productConnection()
    const products = productsConnection.data.productConnection.edges;

    return (
        <div className='container mx-auto pt-32  min-h-screen '>
            <div className="grid grid-cols-12 gap-4">
                {
                    products?.map((product) => product?.node && <div key={product.node?.uniqueId} className="col-span-12  md:col-span-6 lg:col-span-4">
                        <Product  {...product.node} />
                    </div>
                    )
                }
            </div>
        </div>
    )
}
