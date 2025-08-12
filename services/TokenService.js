const Vocab = require("../models/vocabModel.js");

class TokenizerService {
    constructor() {
        this.specialTokens = [
            ["<pad>", 0],
            ["<unk>", 1],
            ["<bos>", 2],
            ["<eos>", 3],
            ["<sep>", 4]
        ];
    }

    async init() {
        for (let [token, id] of this.specialTokens) {
            await Vocab.updateOne({ token }, { token, id }, { upsert: true });
        }
    }

    async getTokenId(token) {
        const row = await Vocab.findOne({ token }).lean();
        return row ? row.id : null;
    }

    async getIdToken(id) {
        const row = await Vocab.findOne({ id }).lean();
        return row ? row.token : null;
    }

    async getNextId() {
        const row = await Vocab.findOne().sort({ id: -1 }).lean();
        return row ? row.id + 1 : 5;
    }

    tokenize(text) {
        return text
            .toLowerCase()
            .replace(/([.,!?;:()\[\]{}"'])/g, ' $1 ') 
            .replace(/\s+/g, ' ') 
            .trim()
            .split(' ');
    }

    async train(text) {
        const words = this.tokenize(text);
        for (let word of words) {
            let exists = await this.getTokenId(word);
            if (!exists) {
                await Vocab.create({ token: word, id: await this.getNextId() });
            }
        }
    }

    async encode(text, addSpecialTokens = true) {
        let tokens = [];
        if (addSpecialTokens) tokens.push(await this.getTokenId("<bos>"));
        const words = this.tokenize(text);
        for (let word of words) {
            tokens.push((await this.getTokenId(word)) ?? await this.getTokenId("<unk>"));
        }
        if (addSpecialTokens) tokens.push(await this.getTokenId("<eos>"));
        return tokens;
    }

    async decode(ids) {
        let result = [];
        for (let id of ids) {
            result.push((await this.getIdToken(id)) ?? "<unk>");
        }
        return result.join(" ").replace(/\s+([.,!?;:()\[\]{}"'])/g, '$1'); 
    }
}

module.exports = new TokenizerService();
