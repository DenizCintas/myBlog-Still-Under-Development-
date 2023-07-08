const express = require("express");
const app = express();
const path = require("path");
const userRouters = require("./router/user");
const adminRouter = require("./router/admin");

app.set("view engine", "ejs");
console.log(app.get("view engine"));
app.use(express.urlencoded({extended: false}))

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use(userRouters);

app.listen(3000, () => {
  console.log("3000 portunda çalıştı");
});
