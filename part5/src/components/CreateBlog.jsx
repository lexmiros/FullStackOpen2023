const CreateBlog = ( {newBlogHandler, createNewBlog, blog} ) => {
  return(
    <div>
      <form onSubmit={createNewBlog}>
        Title : <input
        type="text"
        name="title"
        value={blog.title}
        onChange={newBlogHandler}
        />
        <br/>
        Author: <input
        type="text"
        name="author"
        value={blog.author}
        onChange={newBlogHandler}
        />
        <br/>
        url: <input
        type="text"
        name="url"
        value={blog.url}
        onChange={newBlogHandler}
        />
        <button type="submit">Create blog</button>
      </form>
    </div>
  )
}

export default CreateBlog