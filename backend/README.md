# 🤖 Excel Interview Chatbot

A full-stack AI-powered chatbot application that conducts Microsoft Excel proficiency interviews. Built with NestJS backend, React frontend, and powered by Google's Gemini AI.

## ✨ Features

- **AI-Powered Interviews**: Conducts structured Excel proficiency interviews using Google Gemini AI
- **Interactive Chat Interface**: Real-time conversation with the AI interviewer
- **Structured Assessment**: 10 questions across 3 difficulty levels (Easy, Intermediate, Advanced)
- **Real-time Feedback**: Immediate evaluation and scoring of responses
- **Session Management**: Persistent chat sessions with MongoDB storage
- **Professional UI**: Clean, responsive chat interface built with React

## 🏗️ Project Structure

```
ChatBot/
├── backend/                    # NestJS Backend API
│   ├── src/
│   │   ├── Chat/              # Chat module with MongoDB schemas
│   │   ├── gemini/            # Gemini AI service integration
│   │   ├── app.module.ts      # Main application module
│   │   └── main.ts            # Application entry point
│   ├── tools/                 # AI Tools for interview process
│   │   ├── intro.ts           # Introduction tool
│   │   ├── questions.ts       # Questions and evaluation tool
│   │   └── conclusion.ts      # Final assessment tool
│   ├── systemprompt.ts        # AI system prompt configuration
│   └── package.json           # Backend dependencies
├── Frontend/                   # React Frontend
│   ├── src/
│   │   ├── GeminiChat.tsx     # Main chat component
│   │   ├── GeminiChat.css     # Chat styling
│   │   └── App.tsx            # Root component
│   └── package.json           # Frontend dependencies
└── package.json               # Root package with scripts
```

## 🔧 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **pnpm** package manager
- **MongoDB** (local or cloud instance)
- **Google AI API Key** (for Gemini integration)

## ⚡️ Quick Start

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd ChatBot
```

### 2. Install Dependencies
```bash
# Install all dependencies at once
npm run install:all

# Or install separately
npm install                    # Root dependencies
cd backend && npm install      # Backend dependencies
cd ../Frontend && npm install  # Frontend dependencies
```

### 3. Environment Setup

Create a `.env` file in the `backend` directory:
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/excel-interview

# Google AI API Key
GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# Server Configuration
PORT=3000
```

### 4. Get Google AI API Key

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create a new project or select existing one
3. Generate an API key
4. Add the key to your `.env` file

### 5. Run the Application

```bash
# Start both frontend and backend in development mode
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 🚀 Available Scripts

### Root Level Commands
```bash
npm run dev              # Start both frontend and backend
npm run dev:backend      # Start only backend
npm run dev:frontend     # Start only frontend
npm run build            # Build both applications
npm run install:all      # Install all dependencies
npm run start            # Start production build
```

### Backend Commands
```bash
cd backend
npm run start:dev        # Development mode with watch
npm run build            # Build the application
npm run start:prod       # Production mode
npm run test             # Run unit tests
npm run test:e2e         # Run e2e tests
npm run lint             # Run ESLint
```

### Frontend Commands
```bash
cd Frontend
npm run dev              # Development server
npm run build            # Build for production
npm run preview          # Preview production build
```

## 📱 How to Use

1. **Start the application** using `npm run dev`
2. **Open your browser** and navigate to `http://localhost:5173`
3. **Greet the AI** by typing "Hello" or "Start Interview"
4. **Follow the structured interview**:
   - Introduction and explanation of the process
   - 10 Excel questions across different difficulty levels
   - Real-time feedback and scoring
   - Final assessment and conclusion
5. **View your results** and performance summary

## 🔌 API Endpoints

### POST `/gemini/ask`
Main endpoint for AI chat interactions.

**Request Body:**
```json
{
  "sessionId": "string",
  "messages": [
    {
      "id": "string",
      "role": "user" | "assistant",
      "parts": [
        {
          "type": "text",
          "text": "string"
        }
      ]
    }
  ]
}
```

**Response:**
```json
{
  "response": "string"
}
```

## 🤖 AI Interview System

The chatbot uses a structured approach with three main AI tools:

### 1. Introduction Tool (`introTool`)
- Introduces the AI interviewer
- Explains the interview process and structure
- Confirms user understanding before proceeding

### 2. Questions Tool (`questionsTool`)
- Conducts the main interview with 10 Excel questions:
  - **3 Easy questions** (Basic Excel knowledge)
  - **4 Intermediate questions** (Formulas, functions, data manipulation)
  - **3 Advanced questions** (Complex functions, pivot tables, macros)
- Evaluates each response with detailed scoring
- Provides immediate feedback and explanations

### 3. Conclusion Tool (`conclusionTool`)
- Provides comprehensive final assessment
- Summarizes overall performance and strengths/weaknesses
- Concludes the interview professionally

## 🛠️ Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **MongoDB** with **Mongoose** - Database and ODM
- **Google Gemini AI** - AI conversation engine
- **AI SDK** - Tool integration and function calling
- **Zod** - Schema validation
- **TypeScript** - Type safety

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Concurrently** - Run multiple commands

## 🔧 Dependencies

### Root Dependencies
- `concurrently` - Run multiple commands simultaneously
- `@nestjs/config` - Configuration management

### Backend Dependencies
- `@nestjs/core`, `@nestjs/common` - NestJS framework
- `@nestjs/mongoose` - MongoDB integration
- `@ai-sdk/google`, `ai` - Google AI SDK and tools
- `mongoose` - MongoDB ODM
- `zod` - Schema validation
- `rxjs` - Reactive programming

### Frontend Dependencies
- `react`, `react-dom` - React framework
- `@types/react`, `@types/react-dom` - TypeScript definitions
- `vite` - Build tool and dev server
- `typescript` - TypeScript compiler

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running locally or check cloud connection
- Verify `MONGODB_URI` in `.env` file

**Google AI API Error**
- Verify API key is correct and has proper permissions
- Check API quota and billing settings

**Port Already in Use**
- Backend: Change `PORT` in `.env` file
- Frontend: Vite will automatically use next available port

**Dependencies Issues**
- Delete `node_modules` folders and lock files
- Run `npm run install:all` again

## 🎨 Customization

### Adding New Questions
Edit `backend/tools/questions.ts` to modify the question bank and difficulty levels.

### Customizing AI Behavior
Modify `backend/systemprompt.ts` to change AI instructions and interview flow.

### UI/Styling Changes
Update `Frontend/src/GeminiChat.css` for chat interface modifications.

### Database Schema
Modify schemas in `backend/src/Chat/Schema/` for additional data storage.

## 🚀 Deployment

### Backend Deployment
1. Build the application: `cd backend && npm run build`
2. Set production environment variables
3. Deploy to your preferred platform (Heroku, AWS, Railway, etc.)

### Frontend Deployment
1. Build the application: `cd Frontend && npm run build`
2. Deploy the `dist` folder to hosting service (Netlify, Vercel, etc.)
3. Update API endpoint in frontend if needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💬 Support

For issues and questions:
- Create an issue in the repository
- Check existing issues for solutions
- Review the troubleshooting section above

---

**Built with ❤️ using NestJS, React, and Google Gemini AI**