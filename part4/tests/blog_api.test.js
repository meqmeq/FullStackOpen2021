const listHelper = require("../utils/list_helper");
const totalLikes = require("../utils/list_helper").totalLikes;
const favoriteBlog = require("../utils/list_helper").favoriteBlog;
const mostBlogs = require("../utils/list_helper").mostBlogs;
const mostLikes = require("../utils/list_helper").mostLikes;
const blogs = require("../utils/list_helper").blogs;
const helper = require("./test_helper");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

// test("dummy returns one", () => {
//   const blogs = [];

//   const result = listHelper.dummy(blogs);
//   expect(result).toBe(1);
// });

// describe("total likes", () => {
//   test("of empty list is zero", () => {
//     expect(totalLikes([])).toBe(0);
//   });

//   test("when list has only one blog equals the likes of", () => {
//     expect(
//       totalLikes([
//         {
//           _id: "5a422a851b54a676234d17f7",
//           title: "React patterns",
//           author: "Michael Chan",
//           url: "https://reactpatterns.com/",
//           likes: 7,
//           __v: 0,
//         },
//       ])
//     ).toBe(7);
//   });

//   test("of a bigger list is calculated right", () => {
//     expect(totalLikes(blogs)).toBe(36);
//   });
// });

// describe("The favourite ", () => {
//   test("blog with the most likes", () => {
//     const result = favoriteBlog(blogs);
//     expect(result).toEqual({
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       likes: 12,
//     });
//   });

//   test("author with the most blogs", () => {
//     const result = mostBlogs(blogs);
//     expect(result).toEqual({
//       author: "Robert C. Martin",
//       blogs: 3,
//     });
//   });

//   test("author with the most likes", () => {
//     const result = mostLikes(blogs);
//     expect(result).toEqual({
//       author: "Edsger W. Dijkstra",
//       likes: 17,
//     });
//   });
// });

/// Get Request
test("Returns the correct amount of blog post and is JSON", async () => {
  const allBlogs = await api
    .get("/api/blogs") //From app.js
    .expect(200)
    .expect("Content-Type", /application\/json/); // This assures it's JSON

  expect(allBlogs.body).toHaveLength(helper.initialBlogs.length);
});

/// 4.9 Check if unique identifier id
test("If the unique identifier id exist", async () => {
  const allBlogs = await api.get("/api/blogs");

  expect(allBlogs.body[0].id).toBeDefined();
});

/// 4.10 Verifies post request

test("Check if post request works", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Marc the Tester",
    url: "www.thisisatest.slay",
    likes: 69,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});
//Close all connections

// 4.11 Check if the likes property is 0 when none is added
test("Check default of likes property", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Marc the Tester",
    url: "www.thisisatest.slay",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  const likes = blogsAtEnd.map((blog) => blog.likes);

  expect(likes[blogsAtEnd.length - 1]).toEqual(0);
});

// 4.12 Blog without title and url it returns 400
test("checks blog added without title and url", async () => {
  const newBlog = {
    url: "123",
  };
  await api.post("/api/blogs").send(newBlog).expect(400);

  const endBlog = await helper.blogsInDb();

  expect(endBlog).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
