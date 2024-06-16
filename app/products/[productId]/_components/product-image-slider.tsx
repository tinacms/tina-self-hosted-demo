'use client'
import Image from 'next/image';
import React from 'react'
import { cn } from '../../../../utils/cn';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

interface IProductImageSlider {
    images: string[]
}
export default function ProductImageSlider({ images }: IProductImageSlider) {
    return (
        <TabGroup className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6  w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-6">
                    {images.map((image, index) => (
                        <Tab
                            key={index}
                            className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none"
                        >
                            {({ selected }) => (
                                <>
                                    <span className="absolute inset-0 overflow-hidden rounded-md">
                                        <Image src={image} alt="" className="h-full w-full object-cover object-center" height={100} width={100} />
                                    </span>
                                    <span
                                        className={cn(
                                            selected ? 'ring-brandSecondary-500' : 'ring-transparent',
                                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                        )}
                                        aria-hidden="true"
                                    />
                                </>
                            )}
                        </Tab>
                    ))}
                </TabList>
            </div>

            <TabPanels className="aspect-h-1 aspect-w-1 w-full">
                {images.map((image, index) => (
                    <TabPanel key={index}>
                        <Image
                            src={image}
                            alt={image}
                            className="h-full w-full object-cover object-center sm:rounded-lg"
                            width={400}
                            height={100}
                        />
                    </TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    )
}
