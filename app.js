const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const tokenizerService = require("./services/TokenService");
const cors=require('cors');

const app = express();
app.use(bodyParser.json());

connectDB().then(async () => {
    await tokenizerService.init(); 
});
app.use(cors());
// Routes
const tokenizerRoutes = require("./routes/routes.js");
app.use("/api/tokenizer", tokenizerRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
