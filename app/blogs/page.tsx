import React from 'react'
import { client } from '../../tina/__generated__/databaseClient'
import Blog from '../../components/features/blog';

export default async function Blogs() {
    const BlogsConnection = await client.queries.blogConnection()
    const blogs = BlogsConnection.data.blogConnection.edges;

    if (!blogs || blogs.length === 0) {
        return <div className='container mx-auto pt-32  min-h-screen '>
            No Blog Founds
        </div>
    }
    return (
        <div className='container mx-auto pt-32  min-h-screen '>
            <h1 className='title'>Blogs</h1>
            {blogs && blogs?.length !== 0 && <div className="grid grid-cols-12 gap-4">
                {
                    blogs.map((blog) => {
                        const blogNode = blog?.node
                        if (!blogNode || !blogNode.uniqueId) return null;
                        return <div key={blogNode.uniqueId} className="col-span-12 sm:col-span-6 min-h-[300px] lg:col-span-4" >
                            <Blog
                                date={blogNode.date || blogNode.createdAt || null}
                                uniqueId={blogNode.uniqueId}
                                imageUrl={blogNode.overviewImage || ''}
                                title={blogNode.title || ''}
                            />
                        </div>
                    }
                    )
                }
            </div>}
        </div>
    )
}
