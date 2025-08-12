# Custom Tokenizer API

A Node.js REST API for a custom tokenizer that learns vocabulary from text, encodes text into token IDs, decodes token IDs back into text, and handles punctuation and special tokens. Vocabulary is stored in MongoDB for persistence and scalability.

---

## Features

- Train tokenizer vocabulary dynamically with input text  
- Encode text strings into arrays of numeric token IDs  
- Decode arrays of token IDs back into human-readable text  
- Handle punctuation as separate tokens  
- Support special tokens like `<pad>`, `<unk>`, `<bos>`, `<eos>`, `<sep>`  
- Vocabulary stored and managed in MongoDB  
- Simple RESTful API interface  

---

## Technologies Used

- Node.js & Express  
- MongoDB Atlas (Cloud Database)  
- Mongoose ODM  
- dotenv for configuration  

---

