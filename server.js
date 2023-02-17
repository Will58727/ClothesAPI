import { createServer } from "http";
import app from "./app.js";
import dotenv from "dotenv";


dotenv.config(); // loads and allows access to our environment variables




const server = createServer(app);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
