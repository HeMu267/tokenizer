const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const tokenizerService = require("./services/TokenService");

const app = express();
app.use(bodyParser.json());

connectDB().then(async () => {
    await tokenizerService.init(); 
});

// Routes
const tokenizerRoutes = require("./routes/routes.js");
app.use("/api/tokenizer", tokenizerRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
