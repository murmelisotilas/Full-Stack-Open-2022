import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/logins'
import Notification from './services/Notification'
import AddMessage from './services/AddNotification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => { 
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }
  , [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

/* const createBlog = async (event) => {
  event.preventDefault()
  
  const newBlog = {
    title: blogTitle,
    author: blogAuthor,
    url: blogUrl,
  }
  try {
    blogService.setToken(user.token)
    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  } catch (exception) {
      setErrorMessage('Title and author are required')
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
    }
} */

  const compareNumbers = (a, b) => {
    const aa = a.likes
    const bb = b.likes
    return bb - aa
  }

  const addBlog = async (title, author, url) => {
    const newBlog = {
      title,
      author,
      url,
    }
    try {
      blogService.setToken(user.token)
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    }
    catch (exception) {
      setErrorMessage('Title and author are required')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogDelete = async (id, blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
        setMessage(`${blog.title} by ${blog.author} removed`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage('Error removing blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } 
    }
  }
  const updateBlog = async (id, blogNew) => {
    try { 
      console.log(id)
      const updatedBlog = await blogService.update(id, blogNew)
      const blogsUpdated = blogs.map(b => b.id !== id ? b : updatedBlog)
      setMessage(`${blogNew.title} by ${blogNew.author} updated`)
      setBlogs(blogsUpdated.sort(compareNumbers))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('couldn\'t update blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  
    }
  }





const handleLogout = () => {
  window.localStorage.removeItem('loggedBloglistUser')
  setUser(null)
}

const logOutButton = () => {
  if (user === null) {
    return null
  }
  return (
    <div>
      <div>{user.name} logged in</div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

const blogFormRef = useRef()

if (user === null) {
  return  (
    <div>
      <Notification message={message} />
      <h2>log in to application</h2>
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </Togglable>
    </div>

  )
}
  

  return (
    <div>
      <Notification message={errorMessage}/>
      <AddMessage message={message}/>
      <h2>blogs</h2>
      {logOutButton()}
      <Togglable buttonLabel="add blog" ref={blogFormRef}>
        <BlogForm
          blogTitle={blogTitle}
          blogAuthor={blogAuthor}
          blogUrl={blogUrl}
          handleBlogTitleChange={({ target }) => setBlogTitle(target.value)}
          handleBlogAuthorChange={({ target }) => setBlogAuthor(target.value)}
          handleBlogUrlChange={({ target }) => setBlogUrl(target.value)}
          createBlog={addBlog}
        />
      </Togglable>
      <div>
        {blogs
          .sort(compareNumbers)
          .map(blog =>
          <Blog 
          key={blog.id} 
          blog={blog} 
          updateBlog={updateBlog}
          handleBlogDelete={handleBlogDelete}
          username={user.username}
          /> 
        )}
      </div>
    </div>
  )
}


export default App