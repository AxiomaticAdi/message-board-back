"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app = (0, express_1.default)();
const PORT = 3000;
// Use cors middleware to enable CORS
app.use((0, cors_1.default)());
const messages = [
    {
        id: 1,
        username: "testUser",
        timestamp: new Date().toISOString(),
        content: "Hello, World!",
    },
    {
        id: 2,
        username: "testUser2",
        timestamp: new Date().toISOString(),
        content: "Goodbye, World!",
    },
    {
        id: 3,
        username: "testUser3",
        timestamp: new Date().toISOString(),
        content: "So long, World!",
    },
];
// Initialize Firebase Admin
var databaseAdmin = require("firebase-admin");
var serviceAccount = require("./firebase-admin-sdk-key.json");
// Initialize the app with a service account, granting admin privileges
databaseAdmin.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: "https://messageboard-6ab52-default-rtdb.firebaseio.com",
});
const realtimeDb = databaseAdmin.database();
app.get("/test-realtime-db-write", (req, res) => {
    const ref = realtimeDb.ref("testPath");
    ref
        .set(messages)
        .then(() => res.send("Data written successfully to Realtime Database."))
        .catch((error) => {
        console.error("Error writing to Realtime Database:", error);
        res.status(500).send("Error writing to Realtime Database");
    });
});
app.get("/test-realtime-db-read", (req, res) => {
    const ref = realtimeDb.ref("testPath");
    ref
        .once("value")
        .then((snapshot) => {
        res.json(snapshot.val());
    })
        .catch((error) => {
        console.error("Error reading from Realtime Database:", error);
        res.status(500).send("Error reading from Realtime Database");
    });
});
// Return messages
app.get("/", (req, res) => {
    res.json(messages);
});
// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
