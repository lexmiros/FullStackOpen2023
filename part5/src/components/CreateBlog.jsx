const CreateBlog = ( {newBlogHandler, createNewBlog, newBlog} ) => {
  return(
    <div>
      <form onSubmit={createNewBlog}>
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
        <button type="submit">Create newBlog</button>
      </form>
      <br/>
    </div>
  )
}

export default CreateBlog