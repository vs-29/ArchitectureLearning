// Entry point: start the server and plug in the routes.

const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json()); // lets us read JSON request bodies
app.use(routes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
