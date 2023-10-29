const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

const listHelper = require("../utils/list_helper")

describe("Total Likes", () => {

    test("Sum of likes should be 36", () => {
        expect(listHelper.totalLikes(blogs)).toBe(36)
    })

    test("Sum of likes for no blogs should be 0", () => {
        expect(listHelper.totalLikes()).toBe(0)
    })

    test("Sum of a the first blog is 7", () => {
        expect(listHelper.totalLikes(blogs[0])).toBe(7)
    })
})

describe("Favourite blog", () => {

    test("Favourite blog should be Canonical string reduction", () => {
        expect(listHelper.favouriteBlog(blogs)).toEqual(blogs.find(blog => blog._id === "5a422b3a1b54a676234d17f9"))
    })

    test("Favourite of no blogs should be null", () => {
        expect(listHelper.favouriteBlog()).toEqual(null)
    })

    test("Favourite of a single blog should be itself", () => {
        expect(listHelper.favouriteBlog(blogs[0])).toEqual(blogs[0])
    })
})

describe("Most likes", () => {

    test("Most likes of blog list should be Dijkstra, 17", () => {
        expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
    })

    test("Most likes for no blogs should be null", () => {
        expect(listHelper.mostLikes()).toBe(null)
    })

    test("Most likes for a single blog should be itself", () => {
        expect(listHelper.mostLikes(blogs[0])).toEqual({ author: 'Michael Chan', likes: 7 })
    })
    
})