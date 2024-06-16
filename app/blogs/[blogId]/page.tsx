import Image from 'next/image'
import React from 'react'
import BlogTitle from './_components/blog-title'
import BlogSearch from './_components/blog-search'
import FeatureBlogs from './_components/feature-blogs'
import { IFeatureBlog } from '../../../types/blog'
import { client } from '../../../tina/__generated__/databaseClient'
import { TinaMarkdown } from 'tinacms/dist/rich-text'


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
export default async function BlogDetails(props: { params: { blogId: string } }) {
    const { params: { blogId } } = props;
    const res = await client.queries.blog({ relativePath: `${blogId}.md` });
    const blog = res.data.blog
    const blogTitle = blog.title || ''
    const blogImage = blog.detailPageImage || ''
    const blogContent = blog.blogContent
    const blogDate = blog.date || blog.createdAt || null
    const blogKeywords = blog.keyWords?.map((keyWord) => keyWord || '') || []

    // const featuredBlogsRes = await client.request({
    //     query: `query FeaturedBlogsByKeywords($keywords: [String!]!) {
    //       blog(filter: { keyWords: { in: $keywords } }) {

    //             uniqueId
    //             title
    //             overviewImage
    //             detailPageImage
    //             date
    //             createdAt
    //             blogContent

    //       }
    //     }`,
    //     variables: { keywords: blogKeywords },
    // });

    return (
        <div>
            <section className='h-full w-full relative section_Divider'>
                <Image src={blogImage} width={1500} height={1000} alt={blogId} className='w-full max-h-[100vh]' />
                <div className='absolute w-full bottom-0'>
                    <div className='container mx-auto pb-16'>
                        <BlogTitle date={blogDate} tags={blogKeywords} title={blogTitle} />
                    </div>
                </div>
            </section>
            <section className='container mx-auto section_Divider'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-8'>
                        <TinaMarkdown content={blogContent} />
                    </div>
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
