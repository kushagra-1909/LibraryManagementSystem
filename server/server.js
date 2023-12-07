const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/dbConfig");

dotenv.config({ path: "server/config/config.env" });
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`server is working at http://localhost:${process.env.PORT}`);
});

const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Node server started at ${port}`));
