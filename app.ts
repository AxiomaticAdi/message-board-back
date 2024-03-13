import express, { Request, Response } from "express";
import cors from "cors";
import admin from "firebase-admin";

const app = express();
const PORT = 3000;

// Use cors middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Test data
type Message = {
	id: number;
	timestamp: string;
	username: string;
	content: string;
};

const messages: Message[] = [
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
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://messageboard-6ab52-default-rtdb.firebaseio.com",
});

const realtimeDb = databaseAdmin.database();

app.get("/test-realtime-db-write", (req: Request, res: Response) => {
	const ref = realtimeDb.ref("testPath");
	ref
		.set(messages)
		.then(() => res.send("Data written successfully to Realtime Database."))
		.catch((error: admin.FirebaseError) => {
			console.error("Error writing to Realtime Database:", error);
			res.status(500).send("Error writing to Realtime Database");
		});
});

app.get("/test-realtime-db-read", (req: Request, res: Response) => {
	const ref = realtimeDb.ref("testPath");
	ref
		.once("value")
		.then((snapshot: admin.database.DataSnapshot) => {
			res.json(snapshot.val());
		})
		.catch((error: admin.FirebaseError) => {
			console.error("Error reading from Realtime Database:", error);
			res.status(500).send("Error reading from Realtime Database");
		});
});

// Return messages
app.get("/", (req: Request, res: Response) => {
	const ref = realtimeDb.ref("testPath");
	ref
		.once("value")
		.then((snapshot: admin.database.DataSnapshot) => {
			res.json(snapshot.val());
		})
		.catch((error: admin.FirebaseError) => {
			console.error("Error reading from Realtime Database:", error);
			res.status(500).send("Error reading from Realtime Database");
		});
});

// Start the server on the specified port
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

// POST endpoint to submit messages
app.post("/api/messages", (req: Request, res: Response) => {
	const newMessage = req.body;

	// Generate a new key for the message
	const messagesRef = realtimeDb.ref("testPath");
	const newMessageRef = messagesRef.push();

	// Add timestamp and id to the new message
	newMessage.id = newMessageRef.key; // Firebase generated unique key as id
	newMessage.timestamp = new Date().toISOString();

	// Save the new message to the database
	newMessageRef
		.set(newMessage)
		.then(() => res.status(201).send("Message added successfully."))
		.catch((error: admin.FirebaseError) => {
			console.error("Error adding message to Realtime Database:", error);
			res.status(500).send("Error adding message to Realtime Database");
		});
});
