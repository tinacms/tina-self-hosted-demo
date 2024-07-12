import React from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text';


interface ITechnology {
    title: string;
    description: any
}
export default function Technology({ description, title }: ITechnology) {
    return (
        <div>
            <h2 className='sub_Title'>{title}</h2>
            <TinaMarkdown content={description} />
        </div>
    )
}
