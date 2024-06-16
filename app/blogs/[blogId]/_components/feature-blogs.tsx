import React from 'react'
import FeatureBlog from '../../../../components/features/blog/feature-blog'
import { IFeatureBlog } from '../../../../types/blog'

interface IFeatureBlogs {
    featureBlogs: IFeatureBlog[]
}
export default function FeatureBlogs({ featureBlogs }: IFeatureBlogs) {
    return (
        <div className='flex flex-col gap-4'>
            {featureBlogs.map((featureBlog) => <FeatureBlog key={featureBlog.id} {...featureBlog} />)}
        </div>
    )
}
