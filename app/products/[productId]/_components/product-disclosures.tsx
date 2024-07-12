// ProductDetails.client.tsx
'use client'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { cn } from '../../../../utils/cn';
import { FadeIn, FadeInStagger } from '../../../../components/FadeIn';
// import { TinaMarkdown } from 'tinacms/dist/rich-text';

export interface IProductDisclosure {
    title: string;
    features: (string | null)[]
}
interface IProductDisclosures {
    disclosures: IProductDisclosure[]
}
export default function ProductDisclosures({ disclosures }: IProductDisclosures) {
    return (
        <FadeInStagger className="divide-y divide-gray-200 border-t">
            {disclosures?.map((disclosure) => (disclosure &&
                <Disclosure as="div" key={disclosure.title}>
                    {({ open }) => (
                        <FadeIn >
                            <h3>
                                <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                                    <span
                                        className={cn(open ? ' text-brandSecondary' : 'text-gray-900', 'text-sm font-medium')}
                                    >
                                        {disclosure.title}
                                    </span>
                                    <span className="ml-6 flex items-center">
                                        {open ? (
                                            <MinusIcon
                                                className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <PlusIcon
                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </span>
                                </DisclosureButton>
                            </h3>
                            <DisclosurePanel as="div" className="prose prose-sm pl-6 pb-6 text-sm text-gray-600">
                                {/* <TinaMarkdown content={disclosure.features} /> */}
                                <ul role="link">
                                    {disclosure.features?.map((feature) => (
                                        <li key={feature} style={{ listStyle: 'disc' }}>{feature}</li>
                                    ))}
                                </ul>
                            </DisclosurePanel>
                        </FadeIn>
                    )}
                </Disclosure>
            ))}
        </FadeInStagger>
    );
}