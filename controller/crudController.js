const blogs = [];

exports.getBlogs = (req, res) => {
  res.status(200).json({ blogs });
};

exports.getBlogById = (req, res) => {
  const { text, id } = req.body;
  const blog = null;

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].id === id) {
      blog = i;
      break;
    }
  }

  if (!blog) {
    res.status(400).json({ error: "id is wrong" });
    return;
  }

  res.status(200).json({ blog: blogs[blog] });
};

exports.createBlog = (req, res) => {
  const { text } = req.body;
  const blog = {
    text,
    id: Math.floor(Math.random() * 100000000),
  };
  blogs.push(blog);
  res.status(200).json({ success: true });
};

exports.updateBlog = (req, res) => {
  const { text, id } = req.body;
  const blog = null;

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].id === id) {
      blog = i;
      break;
    }
  }

  if (!blog) {
    res.status(400).json({ error: "id is wrong" });
    return;
  }

  blogs[blog].text = text;
  res.status(200).json({ success: true });
};

exports.deleteBlog = (req, res) => {
  const { id } = req.body;
  const blog = null;

  blogs = blogs.filter((blog) => blog.id !== id);

  if (!blog) {
    res.status(400).json({ error: "id is wrong" });
    return;
  }
  res.status(200).json({ success: true });
};
