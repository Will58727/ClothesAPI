const http = require("http");
require("dotenv").config();

let app = require('./app');

const server = http.createServer(app);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
