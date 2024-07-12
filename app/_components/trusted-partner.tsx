import Image from 'next/image'
import React from 'react'
import { FadeIn, FadeInStagger } from '../../components/FadeIn';


interface ITrustedPartner {
    partners: {
        partnerName: string;
        partnerImage: string
    }[]
}
export default function TrustedPartner({ partners }: ITrustedPartner) {
    return (
        <div className="mx-auto mt-10 flex flex-wrap gap-6 justify-evenly">
            {partners.map(({ partnerImage, partnerName }, index) =>
                <FadeIn>
                    <Image key={index}
                        src={partnerImage}
                        alt={partnerName}
                        width={180}
                        height={44}
                        className="max-h-32  object-contain" />
                </FadeIn>
            )
            }

        </div>
    )
}
