import React from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text';


interface ITechnology {
    title: string;
    description: any
}
export default function Technology({ description, title }: ITechnology) {
    return (
        <div>
            <h2 className='title'>{title}</h2>
            <TinaMarkdown content={description} />
        </div>
    )
}
