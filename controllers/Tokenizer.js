const tokenizerService = require("../services/TokenService.js");

exports.train = async (req, res) => {
    try {
        await tokenizerService.train(req.body.text);
        res.json({ message: "Training complete" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.encode = async (req, res) => {
    try {
        const tokens = await tokenizerService.encode(req.body.text);
        res.json({ tokens });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.decode = async (req, res) => {
    try {
        const text = await tokenizerService.decode(req.body.ids);
        res.json({ text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
