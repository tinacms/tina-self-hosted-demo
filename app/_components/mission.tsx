import React from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text';


interface IMission {
    title: string;
    description: any
}
export default function Mission({ description, title }: IMission) {
    return (
        <div>
            <h2 className='title'>{title}</h2>
            <TinaMarkdown content={description} />
        </div>
    )
}
