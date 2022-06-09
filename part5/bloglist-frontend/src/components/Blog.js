import { useState } from 'react'

const Blog = ({ blog, updateBlog, handleBlogDelete, username }) => {

    const [visible, setVisible] = useState(false)


    const toggleVisibility = () => {
        setVisible(!visible)
    }


    const handleLike = async (event) => {
        event.preventDefault()

        const updatedBlog = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url,
        }
        updateBlog(blog.id, updatedBlog)
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        handleBlogDelete(blog.id, blog)
    }


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return(
        <div style={blogStyle}>
            <div>
                <div>
                    <p>{blog.title}</p>
                    <p>{blog.author}</p>
                </div>
                <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
            </div>
            {visible && (
                <div>
                    <p>{blog.url}</p>
                    <div>
                        <span>{blog.likes} likes</span>
                        <button onClick={handleLike}>like</button>
                    </div>
                    <p>{blog.user.name}</p>
                    {
                        blog.user.username === username && (

                            <button onClick={handleDelete}>delete</button>
                        )
                    }
                </div>
            )}
        </div>
    )
}

export default Blog