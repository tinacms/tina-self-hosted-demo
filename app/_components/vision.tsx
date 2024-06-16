import React from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text';


interface IVision {
    title: string;
    description: any
}
export default function Vision({ description, title }: IVision) {
    return (
        <div>
            <h2 className='title'>{title}</h2>
            <TinaMarkdown content={description} />
        </div>
    )
}
