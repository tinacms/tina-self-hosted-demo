import React from 'react'
import { client } from '../../tina/__generated__/databaseClient'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

export default async function Services() {
    const servicesResponse = await client.queries.services({ relativePath: 'services.md' })
    const services = servicesResponse.data.services
    
    return (
        <div className='container mx-auto pt-32 min-h-screen section_Divider'>
            <div className='grid grid-cols-12  lg:gap-24'>
                <div className='col-span-12 mb-16 lg:col-span-6'>
                    <h1 className='title'>{services.title}</h1>
                    <TinaMarkdown content={services?.description} />
                </div>
                <div className='col-span-12 lg:col-span-6'>
                    <div className='flex flex-col gap-16'>
                        {services.services?.map((service, index) => {
                            return <div key={index}>
                                <h2 className='sub_Title'>{`${index + 1} | `}{service?.title}</h2>
                                <TinaMarkdown content={service?.serviceDescription} />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
