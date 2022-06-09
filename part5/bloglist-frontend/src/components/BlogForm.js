import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const handleBlogTitleChange = (event) => {
        setBlogTitle(event.target.value)
    }

    const handleBlogAuthorChange = (event) => {
        setBlogAuthor(event.target.value)
    }

    const handleBlogUrlChange = (event) => {
        setBlogUrl(event.target.value)
    }

    const handleBlogAdd = (event) => {
        event.preventDefault()
        createBlog(
            blogTitle,
            blogAuthor,
            blogUrl,
        )
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }

    return(
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={handleBlogAdd}>
                <div>
            title
                    <input
                        type="text"
                        value={blogTitle}
                        name="Title"
                        onChange={handleBlogTitleChange}
                    />
                </div>
                <div>
            author
                    <input
                        type="text"
                        value={blogAuthor}
                        name="Author"
                        onChange={handleBlogAuthorChange}
                    />
                </div>
                <div>
            url
                    <input
                        type="text"
                        value={blogUrl}
                        name="Url"
                        onChange={handleBlogUrlChange}
                    />
                </div>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm