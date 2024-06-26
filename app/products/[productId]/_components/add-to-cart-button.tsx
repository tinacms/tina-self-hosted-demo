'use client'
//the reason behind creating this component is because as this is client component and rest in product are server component so to achieve batter seo.
import { ProductQuery } from "../../../../tina/__generated__/types";

interface IAddToCartButton {
    product: ProductQuery['product']
}
export default function AddToCartButton({ product }: IAddToCartButton) {

    const handleAddToCart = () => {
        // handle Add To cart Functionality here
    };

    return (
        <button onClick={handleAddToCart} type="submit" className='mt-8 border-solid border-2 border-brandSecondary text-brandSecondary bg-transparent py-3 w-full rounded-lg hover:bg-brandSecondary hover:text-white transition duration-700 ease-in-out'>Add to Cart</button>
    )
}