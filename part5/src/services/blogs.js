import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: {Authorization : token}
  }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const updateBlog = async (newBlog) => {
  const config = {
    headers: {Authorization: token}
  }
  const requestUrl = `${baseUrl}/${newBlog.id}`
  const request = await axios.put(requestUrl, newBlog, config)
  return request.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: {Authorization: token}
  }
  const requestUrl = `${baseUrl}/${blog.id}`
  const request = await axios.delete(requestUrl, config)
  return request.data
}

export default { getAll, setToken, createBlog, updateBlog, deleteBlog }