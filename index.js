const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const tempDbPath = path.join("/tmp", "db.json");

if (!fs.existsSync(tempDbPath)) {
  const sourceDbPath = path.join(__dirname, "db.json");
  if (fs.existsSync(sourceDbPath)) {
    fs.copyFileSync(sourceDbPath, tempDbPath);
  } else {
    fs.writeFileSync(tempDbPath, JSON.stringify({})); 
  }
}

const server = jsonServer.create();
const router = jsonServer.router(tempDbPath);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
