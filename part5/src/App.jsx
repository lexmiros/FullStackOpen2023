import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import login from "./services/login"
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  
  const [notification, setNotification] = useState({
    message: null,
    isError: null
  })
  const createBlogRef = useRef()

  const createTimeoutMessage = (message, isError) => {
    setNotification({message, isError});
      setTimeout(() => {
        setNotification({message: null, isError: null});
      }, 5000);
  }

  const checkForLoggedInUser = () => {
    const loggedInUser = window.localStorage.getItem("loggedInBlogUser")
    
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedInBlogUser")
    window.location.reload()
  }

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const newUser = await login.login({
        username: username,
        password: password
      })

      window.localStorage.setItem(
        "loggedInBlogUser", JSON.stringify(newUser)
      )
        
      setUser(newUser)
      blogService.setToken(newUser.token)
      setUsername("")
      setPassword("")

    } catch(exception) {
      console.log(exception)
      createTimeoutMessage(exception.message, true)
      setUsername("")
      setPassword("")
    }
  }

  const createNewBlog = async (newBlog) => {
    event.preventDefault()
    try {
      createBlogRef.current.toggleVisibility()
      const createdBlog = await blogService.createBlog(newBlog)
      createTimeoutMessage("New blog created", false)
      setBlogs(blogs.concat(createdBlog))
    } catch(excetpion) {
      createTimeoutMessage(`Error creating new blog: ${excetpion.message}`, true)
    }
  }

  const incrementLikes = async (blog) => {
    const newBlogLikes = blog.likes + 1
    const newBlog = {...blog, likes: newBlogLikes}
    await blogService.updateBlog(newBlog)

    const newBlogs = blogs.map(blog => blog.id === newBlog.id ? newBlog : blog)
    newBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(newBlogs)
  }

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const allBlogs = await blogService.getAll();
        allBlogs.sort((a, b) => b.likes - a.likes);
        console.log(allBlogs)
        setBlogs(allBlogs);
      } catch (error) {
        console.error("Error fetching and setting blogs:", error);
      }
    };
  
    getAllBlogs(); 
  
  }, []);
  

  useEffect(checkForLoggedInUser, [])

  return (
    <div>
      <Notification notification={notification} />
      {!user && (
        <LoginForm
          loginHandler={loginHandler}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
  
      {user && (
        <div>
          <h2>blogs</h2> <button onClick={logout}>Logout</button>
          <h3>{`${user.name} is logged in`}</h3>
          <Togglable buttonLabel={"Create a new blog"} ref={createBlogRef}>
            <CreateBlog createNewBlog={createNewBlog}/>
          </Togglable>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}/>
          ))}
        </div>
      )}
    </div>
  );

}
export default App