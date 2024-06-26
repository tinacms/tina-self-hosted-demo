import Image from 'next/image'
import React from 'react'


interface ITrustedPartner {
    partners: {
        partnerName: string;
        partnerImage: string
    }[]
}
export default function TrustedPartner({ partners }: ITrustedPartner) {
    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                {
                    partners.map(({ partnerImage, partnerName }, index) =>
                        <li key={index}>
                            <Image src={partnerImage} alt={partnerName} width={150} height={100} />
                        </li>)
                }
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                {
                    partners.map(({ partnerImage, partnerName }, index) =>
                        <li key={index}>
                            <Image src={partnerImage} alt={partnerName} width={150} height={100} />
                        </li>)
                }
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                {
                    partners.map(({ partnerImage, partnerName }, index) =>
                        <li key={index}>
                            <Image src={partnerImage} alt={partnerName} width={150} height={100} />
                        </li>)
                }
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                {
                    partners.map(({ partnerImage, partnerName }, index) =>
                        <li key={index}>
                            <Image src={partnerImage} alt={partnerName} width={150} height={100} />
                        </li>)
                }
            </ul>
        </div>
    )
}
