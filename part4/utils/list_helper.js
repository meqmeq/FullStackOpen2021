var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  const blogArray = [];

  for (var i = 0; i < blogs.length; i++) {
    blogArray.push(blogs[i].likes);
  }

  return blogs.length === 0 ? 0 : blogArray.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  var maxValue = 0;
  for (var i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxValue) {
      maxValue = blogs[i].likes;
    }
  }
  const result = blogs.filter((blog) => blog.likes === maxValue);
  const answer = {
    title: result[0].title,
    author: result[0].author,
    likes: result[0].likes,
  };
  return answer;
};

const mostBlogs = (blogs) => {
  const blogCount = _.countBy(blogs, "author");
  const blogKeys = Object.keys(blogCount);
  const blogValues = Object.values(blogCount);
  var result = {
    author: blogKeys[blogKeys.length - 1],
    blogs: blogValues[blogValues.length - 1],
  };

  return result;
};

const mostLikes = (blogs) => {
  const likeCount = _.groupBy(blogs, "author");
  console.log(likeCount);
  var lilDict = {};

  _.forEach(likeCount, (value, key) => {
    var varLikes = 0;

    _.forEach(value, (e) => (varLikes += e.likes));
    lilDict[key] = varLikes;
  });
  var maxKey = _.maxBy(_.keys(lilDict), (o) => {
    return lilDict[o];
  });

  const answer = {
    author: maxKey,
    likes: lilDict[maxKey],
  };

  return answer;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
