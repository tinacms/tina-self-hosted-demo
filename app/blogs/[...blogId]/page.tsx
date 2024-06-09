import Image from 'next/image'
import React from 'react'
import BlogTitle from './_components/blog-title'
import BlogSearch from './_components/blog-search'
import FeatureBlogs from './_components/feature-blogs'
import { IFeatureBlog } from '../../../types/blog'


const featureBlogs: IFeatureBlog[] = [
    {
        id: '1',
        imageUrl: 'https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2021/12/3-inspect-x-3d-offset-ct-higher-resolution-scans-1.png',
        title: 'Non-destructive inspection of large components taken to the next level'
    },
    {
        id: '2',
        imageUrl: 'https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2021/12/3-inspect-x-3d-offset-ct-higher-resolution-scans-1.png',
        title: 'Non-destructive inspection of large components taken to the next level'
    },
    {
        id: '3',
        imageUrl: 'https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2021/12/3-inspect-x-3d-offset-ct-higher-resolution-scans-1.png',
        title: 'Non-destructive inspection of large components taken to the next level'
    },
]
export default function BlogDetails(props: { params: { blogId: string } }) {
    const { params: { blogId } } = props
    return (
        <div>
            <section className='h-full w-full relative section_Divider'>
                <Image src='https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2024/04/DSC_9285-1.jpg' width={1500} height={1000} alt={blogId} className='w-full max-h-[100vh]' />
                <div className='absolute w-full bottom-0'>
                    <div className='container mx-auto pb-16'>
                        <BlogTitle date={new Date()} tags={['marketing', 'news']} title='Nikon-AAT3D integration ushers in new era of in-process metrology efficiency and precision' />
                    </div>
                </div>
            </section>
            <section className='container mx-auto section_Divider'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-8'>
                        Blog Content will come here</div>
                    <div className='col-span-4 px-4'>
                        <div className='flex flex-col'>
                            <BlogSearch />
                            <div className='mt-8'>
                                <h2 className='title' style={{ textAlign: 'left' }}>Featured Articles</h2>
                                <FeatureBlogs featureBlogs={featureBlogs} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}
