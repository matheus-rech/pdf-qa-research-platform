# 🧠 Advanced PDF Q&A Research Platform

> **AI-Powered Document Analysis with Citation Tracking and Visual Highlighting**

A sophisticated research platform that combines Claude AI's citation capabilities with interactive PDF viewing, allowing researchers to ask questions about documents and receive precise, cited answers with visual highlighting.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## ✨ Features

### 🤖 AI-Powered Q&A
- **Claude AI Integration** - Powered by Anthropic's Claude with built-in citations
- **Intelligent Analysis** - Upload PDFs and ask natural language questions
- **Real-time Processing** - Get instant answers with source verification

### 📊 Advanced Citation System
- **Precise Citations** - Character-level accuracy in source references
- **Visual Highlighting** - Interactive highlights in PDF viewer
- **Page Navigation** - Auto-jump to relevant document sections
- **Citation Anchors** - Quick-jump navigation between citations and sources

### 📚 Research Management
- **Comprehensive History** - Full session tracking with thumbnails
- **Cross-Document Analysis** - Work with multiple PDFs
- **Search Functionality** - Find previous research across all sessions
- **Export Capabilities** - Generate Markdown, HTML, and JSON reports

### 🎨 Professional Interface
- **Responsive Design** - Works on desktop and mobile
- **Accessibility** - ARIA labels and keyboard shortcuts
- **Visual Feedback** - Loading states and progress indicators
- **Error Handling** - Graceful error management with user feedback

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose (for production)
- Anthropic API key

### Development Setup

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd pdf-qa-app
   ```

2. **Configure Environment**
   ```bash
   # Create .env file
   echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env
   ```

3. **Install Dependencies**
   ```bash
   cd backend-claude
   npm install
   ```

4. **Start Development Server**
   ```bash
   # Terminal 1: Start backend
   node index.js

   # Terminal 2: Serve frontend
   cd ..
   python3 -m http.server 8080
   ```

5. **Access Application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5002

### Production Deployment

1. **Configure Environment**
   ```bash
   # Set your API key in .env
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   NODE_ENV=production
   ```

2. **Deploy with Docker**
   ```bash
   docker-compose -f docker-compose.production.yml up -d
   ```

3. **Access Application**
   - Application: http://localhost
   - Health Check: http://localhost/health

## 📖 How to Use

### Basic Workflow
1. **Upload PDF** - Click "Upload PDF for Analysis"
2. **Ask Questions** - Type natural language questions
3. **Review Citations** - Click citations to jump to sources
4. **Export Research** - Generate reports in multiple formats

### Advanced Features

#### 🔍 Search History
- Use **Ctrl/Cmd + S** to search previous research
- Find questions, answers, or citations across all sessions
- Filter by document name or content

#### 📤 Export Options
- **Markdown Report** - Clean text format for documentation
- **HTML Report** - Formatted report for sharing
- **JSON Data** - Raw data for further analysis

#### ⌨️ Keyboard Shortcuts
- **Ctrl/Cmd + Enter** - Submit question
- **Ctrl/Cmd + S** - Search history
- **Arrow Keys** - Navigate PDF pages

## 🏗️ Architecture

### Frontend
- **Single-page application** with vanilla JavaScript
- **PDF.js** for document rendering
- **Tailwind CSS** for responsive design
- **Progressive enhancement** for accessibility

### Backend
- **Node.js + Express** REST API
- **Anthropic Claude SDK** for AI processing
- **Multer** for file upload handling
- **Production-ready** with security headers

### Deployment
- **Docker containers** for easy deployment
- **Nginx reverse proxy** with rate limiting
- **Health checks** and monitoring
- **SSL/TLS ready** configuration

## 🔧 Configuration

### Environment Variables
```bash
# Required
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Optional
NODE_ENV=production
PORT=5002
```

## 📊 API Reference

### Endpoints

#### `POST /api/ask-with-citations`
Upload PDF and ask question with citations.

**Request:**
- `Content-Type: multipart/form-data`
- `pdf`: PDF file
- `question`: Question string

**Response:**
```json
{
  "answer": "The main conclusion is...",
  "citations": [
    {
      "cited_text": "exact quote from document",
      "page_number": 5,
      "start_char": 1234,
      "end_char": 1289
    }
  ],
  "usage": {
    "input_tokens": 1500,
    "output_tokens": 250
  }
}
```

## 🔒 Security

### Production Security
- **CORS configuration** for secure origins
- **Rate limiting** to prevent abuse
- **File validation** for PDF uploads only
- **Security headers** via Nginx

### Data Privacy
- **No persistent storage** of documents on server
- **Temporary file cleanup** after processing
- **Client-side session storage** for history

## 📈 Current Status

**✅ PRODUCTION READY**

This platform is fully functional and ready for deployment with:
- Claude AI integration with citations
- Visual PDF highlighting and navigation
- Comprehensive research history and export
- Production-grade security and performance
- Professional UI/UX with accessibility features

---

**Built with ❤️ for researchers, students, and knowledge workers**
