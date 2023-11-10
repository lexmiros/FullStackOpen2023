import { useState } from "react"

const CreateBlog = ( {createNewBlog} ) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: ""
  })

  const newBlogHandler = (event) => {
    event.preventDefault()
    const {name, value} = event.target
    setNewBlog({...newBlog, [name] :value})
  }

  const createBlog = () => {
    createNewBlog(newBlog)
    setNewBlog({
      title: "",
      author: "",
      url: ""
    })
  }

  return(
    <div>
      <form onSubmit={createBlog}>
        Title : <input
        type="text"
        name="title"
        value={newBlog.title}
        onChange={newBlogHandler}
        />
        <br/>
        Author: <input
        type="text"
        name="author"
        value={newBlog.author}
        onChange={newBlogHandler}
        />
        <br/>
        url: <input
        type="text"
        name="url"
        value={newBlog.url}
        onChange={newBlogHandler}
        />
        <br/>
        <button type="submit">Create newBlog</button>
      </form>
      <br/>
    </div>
  )
}

export default CreateBlog