import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import login from "./services/login"
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: ""
  })
  const [notification, setNotification] = useState({
    message: null,
    isError: null
  })

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

  const newBlogHandler = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setNewBlog({...newBlog, [name]: value})
  }

  const createNewBlog = async () => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.createBlog(newBlog)
      createTimeoutMessage("New blog created", false)
    } catch(excetpion) {
      createTimeoutMessage(`Error creating new blog: ${excetpion.message}`, true)
    }
    setNewBlog({title: "", author: "", url: ""})
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
          <CreateBlog newBlogHandler={newBlogHandler} createNewBlog={createNewBlog} newBlog={newBlog}/>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );

}
export default App