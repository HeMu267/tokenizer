const express = require("express");
const router = express.Router();
const tokenizerController = require("../controllers/Tokenizer.js");

router.post("/train", tokenizerController.train);
router.post("/encode", tokenizerController.encode);
router.post("/decode", tokenizerController.decode);

module.exports = router;
