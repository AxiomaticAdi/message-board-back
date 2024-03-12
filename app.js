"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
// Use cors middleware to enable CORS
app.use((0, cors_1.default)());
const messages = [
    {
        id: 1,
        content: "Hello, World!",
    },
    {
        id: 2,
        content: "Goodbye, World!",
    },
    {
        id: 3,
        content: "So long, World!",
    },
];
// Return messages
app.get("/", (req, res) => {
    res.json(messages);
});
// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
