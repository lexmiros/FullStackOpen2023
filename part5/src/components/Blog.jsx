import Togglable from "./Toggleable"
import blogService from "../services/blogs"

const Blog = ({ blog, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const incrementLikes = async (blog) => {
    const newBlogLikes = blog.likes + 1
    const newBlog = {...blog, likes: newBlogLikes}
    await blogService.updateBlog(newBlog)

    const newBlogs = blogs.map(blog => blog.id === newBlog.id ? newBlog : blog)
    newBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(newBlogs)
  }

  return(
    <div style={blogStyle}>
      {blog.title} 
      <Togglable buttonLabel={"View"}>
      Author:{blog.author} <br/> 
      URL: {blog.url} <br/> 
      Like: {blog.likes} <button onClick={() => incrementLikes(blog)}>Like</button> <br/> 
      </Togglable>
      <br/>
      
    </div> 
  ) 
}

export default Blog