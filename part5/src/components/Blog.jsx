import Togglable from "./Toggleable"

const Blog = ({ blog, incrementLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      {blog.title} 
      <Togglable buttonLabel={"View"}>
      Author:{blog.author} <br/> 
      URL: {blog.url} <br/> 
      Like: {blog.likes} <button onClick={() => incrementLikes(blog)}>Like</button> <br/> 
      </Togglable>
    </div> 
  ) 
}

export default Blog