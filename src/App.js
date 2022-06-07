import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'
import Notification from './services/Notification'
import AddMessage from './services/AddNotification'

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

const addBlog = async (event) => {
  event.preventDefault()

  const newBlog = {
    title: blogTitle,
    author: blogAuthor,
    url: blogUrl,
  }
  try {
    blogService.setToken(user.token)
    const returnedBlog = await blogService.create(newBlog)
    
    console.log('returnedBlog', returnedBlog);
    setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setBlogs(blogs.concat(returnedBlog))
    
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  } catch (exception) {
      setErrorMessage('Title and author are required')
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
    }
}
  /* 
  const blogObject = {
    title: blogTitle,
    author: blogAuthor,
  }
  blogService.create(blogObject).then(returnedBlog => {
    setBlogs(blogs.concat(returnedBlog))
    setBlogAuthor('')
    setBlogTitle('')
  })
} */


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

const loginForm = () => (

<div>
  <h2>Log in to application</h2>
<form onSubmit={handleLogin}>
  <div>
    username
    <input
      type="text"
      value={username}
      name="Username"
      onChange={({ target }) => setUsername(target.value)}
    />
  </div>
  <div>
    password
    <input
      type="password"
      value={password}
      name="Password"
      onChange={({ target }) => setPassword(target.value)}
      autoComplete="on"
    />
  </div>
  <button type="submit">login</button>
</form>
</div>
)

const blogForm = () => (
  <div>
    <h2>Create new blog</h2>
    <form onSubmit={addBlog}>
      <div>
        title
      <input
        type="text"
        value={blogTitle}
        name="Title"
        onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        author
      <input
        type="text"
        value={blogAuthor}
        name="Author"
        onChange={({ target }) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        url
      <input
        type="text"
        value={blogUrl}
        name="Url"
        onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  </div>
)

const showBlogs = () => (
  <div>
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  </div>
)
  
  return (
    <div>
      <Notification message={errorMessage}/>
      <AddMessage message={message}/>

      {user === null && loginForm()}
      {user !== null && blogForm()}
      {user !== null && logOutButton()}
      
      
      <h2>blogs</h2>
      {user !== null && showBlogs()}
    </div>
  )
}


export default App