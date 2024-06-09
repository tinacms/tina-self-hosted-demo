import Image from 'next/image'
import React from 'react'


interface ITrustedPartner {
    brandImages: string[]
}
export default function TrustedPartner({ brandImages }: ITrustedPartner) {
    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                {
                    brandImages.map((brandImage, index) =>
                        <li key={index}>
                            <Image src={brandImage} alt={brandImage} width={100} height={100} />
                        </li>)
                }
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                {
                    brandImages.map((brandImage, index) =>
                        <li key={index}>
                            <Image src={brandImage} alt="Facebook" width={100} height={100} />
                        </li>)
                }
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                {
                    brandImages.map((brandImage, index) =>
                        <li key={index}>
                            <Image src={brandImage} alt="Facebook" width={100} height={100} />
                        </li>)
                }
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                {
                    brandImages.map((brandImage, index) =>
                        <li key={index}>
                            <Image src={brandImage} alt="Facebook" width={100} height={100} />
                        </li>)
                }
            </ul>
        </div>
    )
}
