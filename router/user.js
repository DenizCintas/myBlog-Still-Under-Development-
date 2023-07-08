const express = require("express");
const router = express.Router();
const db = require("../data/db");

router.use("/belgeler", function (req, res) {
  res.render("users/document");
});
router.use("/dizi", function (req, res) {
  res.render("users/series");
});
router.use("/film", function (req, res) {
  res.render("users/film");
});
router.use("/seyahat", function (req, res) {
  res.render("users/travel");
});
router.use("/about", function (req, res) {
  res.render("users/about");
});
router.use("/blogs/category/:categoryid", async function(req,res){
  const id = req.params.categoryid
  try{
    const [blogs] = await db.execute("select * from blog where categoryid=? ", [id]);
    const [categories] = await db.execute("select * from category");

    res.render("users/index", {
      blogs: blogs,
      categories: categories,
      selectedCategory:id
    });

  }
   catch (err) {
    console.log(err);
  }
})
router.use("/blogs/:blogid", async function (req, res) {
  const id = req.params.blogid;
  try {
    const [blogs] = await db.execute("select * from blog where blogid=? ", [
      id,
    ]);
    const blog = blogs[0];
    if (blog) {
      return res.render("users/blog-details", {
        blog: blog,
      });
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
  console.log(id);
  res.render("users/blog-details");
});
router.use("/blogs", async function (req, res) {
  try {
    const [blogs] = await db.execute("select * from blog where anasayfa =1");
    res.render("users/blogs", {
      blogs: blogs,
    });
  } catch (err) {
    console.log(err);
  }
});
router.use("/", async function (req, res) {
  try {
    const [blogs] = await db.execute("select * from blog where anasayfa =1");
    const [categories] = await db.execute("select * from category");
    res.render("users/index", {
      blogs: blogs,
      categories: categories,
      selectedCategory:null
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
