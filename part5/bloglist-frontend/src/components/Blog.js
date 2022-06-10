import { useState } from 'react'

const Blog = ({ blog, updateBlog, handleBlogDelete, username, mockHandler }) => {

    const [visible, setVisible] = useState(false)


    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const trulyToggleVisibility = () => {
        if (mockHandler === undefined) {
            return(
                toggleVisibility()
            )
        }
        else {
            return(
                mockHandler
            )
        }
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
                    <p className='testTitle'>{blog.title}</p>
                    <p className='testAuthor'>{blog.author}</p>
                </div>
                <button onClick={trulyToggleVisibility}>{visible ? 'hide' : 'show'}</button>
            </div>
            {visible && (
                <div>
                    <p className='testUrl'>{blog.url}</p>
                    <div>
                        <span className='testLikes'>{blog.likes} likes</span>
                        <button onClick={handleLike}>like</button>
                    </div>
                    <p className='testName'>{blog.user.name}</p>
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