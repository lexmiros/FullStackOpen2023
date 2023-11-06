import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import login from "./services/login"
import CreateBlog from './components/CreateBlog'

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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const checkForLoggedInUser = () => {
    const loggedInUser = window.localStorage.getItem("loggedInBlogUser")
    
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
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
      setUsername("")
      setPassword("")

    } catch(exception) {
      console.log(exception)
      setUsername("")
      setPassword("")
    }
  }

  const newBlogHandler = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setNewBlog({...blog, [name]: value})
  }

  const createNewBlog = () => {
    console.log(newBlog)
  }

  useEffect(checkForLoggedInUser, [])

  return (
    <div>
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
          <CreateBlog newBlogHandler={newBlogHandler} createNewBlog={createNewBlog} blog={newBlog}/>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );

}
export default App