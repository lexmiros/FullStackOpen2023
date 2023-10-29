const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helpers = require("./test_helpers");

const initiaBlogs = helpers.blogs;

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjecs = initiaBlogs.map((blog) => new Blog(blog));
  const blogPromiseArray = blogObjecs.map((blog) => blog.save());
  await Promise.all(blogPromiseArray);
});

test("Test should return all blogs", async () => {
  const blogs = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-type", /application\/json/);
  expect(blogs.body).toHaveLength(initiaBlogs.length);
});

test("Test should post a blog", async () => {
  const newBlog = {
    title: "New Blog",
    author: "Me",
    url: "hhtps:newblog.com.nz",
    likes: 100,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const allBlogsAfterAdding = await helpers.getAllBlogs();
  expect(allBlogsAfterAdding).toHaveLength(initiaBlogs.length + 1);

  const contents = allBlogsAfterAdding.map((b) => b.title);
  expect(contents).toContain("New Blog");
});

test("ID should be defined instead of MongoDB deafault _ID", async () => {
    const allBlogs = await helpers.getAllBlogs()

    allBlogs.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test("Likes should default to zero if not set", async () => {
    const newBlog = {
        title: "New blog",
        author: "Me",
        url: "www.come"
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
    
    const allBlogsAfterPost = await helpers.getAllBlogs()
    const blogWithZeroLikes = allBlogsAfterPost.filter(blog => blog.title === "New blog")[0]
    expect(blogWithZeroLikes.likes).toBe(0)

})

test("Test should return 400 error when posting blog with no title or url", async () => {
   const newBlogWithoutTitle = {
    author: "Me",
    url: "www.me.com",
    likes: 10
   }

   const newBlogWithoutUrl = {
    title: "New Blog no Url",
    auth: "Me",
    likes: 10
   }
   
   await api
    .post("/api/blogs")
    .send(newBlogWithoutTitle)
    .expect(400)

   await api
    .post("/api/blogs")
    .send(newBlogWithoutUrl)
    .expect(400)
})

test("Test should delete a blog post and return 204 status", async () => {
  const notesAtStart = await helpers.getAllBlogs()
  const notesToDelete = notesAtStart[0]
  
 await api
    .delete(`/api/blogs/${notesToDelete.id}`)
    .expect(204)
  
  const allBlogsAfterDeletion = await helpers.getAllBlogs()

  expect(allBlogsAfterDeletion).toHaveLength(notesAtStart.length - 1)

  const allBlogIdsAfterDeletion = allBlogsAfterDeletion.map(blog => blog.id)

  expect(allBlogIdsAfterDeletion).not.toContain(notesToDelete.id)
})

test("Test should successfully updated blog", async () => {
  const blogAtStart = await helpers.getAllBlogs()
  const blogToUpdate = blogAtStart[0]
 
  const newBlog = {
    title: "Updated blog",
    author: "New Author",
    url: "Newurl.com",
    likes:1001
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)

  
})

afterAll(async () => {
  await mongoose.connection.close();
});
