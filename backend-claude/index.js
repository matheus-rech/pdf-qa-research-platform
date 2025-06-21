import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Security and middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com', 'http://localhost'] 
    : true,
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Configure multer for file uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({ 
  dest: uploadsDir,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 1
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Initialize Anthropic client
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY environment variable is required');
  process.exit(1);
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.get("/", (req, res) => {
  res.json({ message: "PDF Q&A Claude Backend with Citations", status: "OK" });
});

// Upload PDF and extract text for citations
app.post("/api/upload-pdf", upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    
    // Clean up uploaded file
    fs.unlinkSync(filePath);
    
    // Create a document with citations enabled
    const document = await anthropic.beta.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "document",
              source: {
                type: "base64",
                media_type: "application/pdf",
                data: fileBuffer.toString('base64')
              },
              citations: {
                enabled: true
              }
            },
            {
              type: "text", 
              text: "Please analyze this PDF document and confirm it has been processed for citations."
            }
          ]
        }
      ]
    });

    res.json({ 
      message: "PDF processed successfully with citations enabled",
      documentId: req.file.originalname,
      content: document.content[0].text
    });

  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ error: error.message });
  }
});

// Ask questions with citations
app.post("/api/ask-with-citations", upload.single('pdf'), async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required" });
    }

    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    
    // Clean up uploaded file
    fs.unlinkSync(filePath);

    // Create message with PDF document and citations
    const response = await anthropic.beta.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "document",
              source: {
                type: "base64",
                media_type: "application/pdf",
                data: fileBuffer.toString('base64')
              },
              citations: {
                enabled: true
              }
            },
            {
              type: "text",
              text: `Please answer this question based on the provided PDF document: ${question}

Provide a detailed answer with specific citations from the document. Include page references and quote the relevant text that supports your answer.`
            }
          ]
        }
      ]
    });

    // Extract citations and text blocks
    const content = response.content[0];
    let citations = [];
    let textBlocks = [];

    if (content.type === 'text') {
      textBlocks.push({
        text: content.text,
        citations: content.citations || []
      });
      citations = content.citations || [];
    }

    res.json({
      answer: content.text,
      citations: citations,
      textBlocks: textBlocks,
      usage: response.usage
    });

  } catch (error) {
    console.error("Error with Claude citations:", error);
    res.status(500).json({ error: error.message });
  }
});

// Simplified ask endpoint (without file upload each time)
app.post("/api/ask-simple", async (req, res) => {
  try {
    const { question, context } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `Context: ${context || 'No specific context provided'}
          
Question: ${question}

Please provide a clear, concise answer.`
        }
      ]
    });

    res.json({
      answer: response.content[0].text,
      usage: response.usage
    });

  } catch (error) {
    console.error("Error with simple ask:", error);
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 5002;
app.listen(port, () => console.log(`Claude Backend listening on port ${port}`));