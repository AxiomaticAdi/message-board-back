import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Use cors middleware to enable CORS
app.use(cors());

type Message = {
	id: number;
	content: string;
};

const messages: Message[] = [
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
	{
		id: 4,
		content: "Tomorrow is a new day!",
	},
];

// Return messages
app.get("/", (req: Request, res: Response) => {
	res.json(messages);
});

// Start the server on the specified port
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
