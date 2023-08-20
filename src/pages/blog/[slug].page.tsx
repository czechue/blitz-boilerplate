import React from 'react'
import { useParam } from '@blitzjs/next'

const BlogPostPage = () => {
    const slug = useParam('slug', 'string')

    return <div>BlogPostPage page {slug}</div>
}

export default BlogPostPage
