
## �� Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **pnpm** package manager
- **MongoDB** (local or cloud instance)
- **Google AI API Key** (for Gemini integration)

## ��️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ChatBot
```

### 2. Install Dependencies

#### Option A: Install all dependencies at once (Recommended)
```bash
npm run install:all
```

#### Option B: Install dependencies separately
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
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

## �� Running the Application

### Development Mode (Both Frontend & Backend)
```bash
npm run dev
```

### Run Services Separately

#### Backend Only
```bash
npm run dev:backend
# or
cd backend && npm run start:dev
```

#### Frontend Only
```bash
npm run dev:frontend
# or
cd Frontend && npm run dev
```

### Production Mode
```bash
npm run build
npm run start
```

## 📱 Usage

1. **Start the application** using `npm run dev`
2. **Open your browser** and navigate to `http://localhost:5173` (Frontend)
3. **Backend API** will be available at `http://localhost:3000`
4. **Start the interview** by typing "Hello" or "Start Interview"
5. **Follow the conversation** as the AI conducts the Excel interview
6. **Answer questions** and receive real-time feedback

## 🏗️ Project Structure

### Backend (`/backend`)





## 🔧 Dependencies

### Root Dependencies
- `concurrently` - Run multiple commands simultaneously
- `@nestjs/config` - Configuration management

### Backend Dependencies
- `@nestjs/core` - NestJS framework
- `@nestjs/mongoose` - MongoDB integration
- `@ai-sdk/google` - Google AI SDK
- `ai` - AI SDK for tool integration
- `mongoose` - MongoDB ODM
- `zod` - Schema validation

### Frontend Dependencies
- `react` - React framework
- `react-dom` - React DOM rendering
- `vite` - Build tool and dev server
- `typescript` - TypeScript support

## 🛠️ Available Scripts

### Root Level
```bash
npm run dev              # Start both frontend and backend
npm run dev:backend      # Start only backend
npm run dev:frontend     # Start only frontend
npm run build            # Build both applications
npm run install:all      # Install all dependencies
npm run start            # Start production build
```

### Backend Scripts
```bash
npm run start:dev        # Development mode with watch
npm run build            # Build the application
npm run start:prod       # Production mode
npm run test             # Run unit tests
npm run test:e2e         # Run e2e tests
npm run lint             # Run ESLint
```

### Frontend Scripts
```bash
npm run dev              # Development server
npm run build            # Build for production
npm run preview          # Preview production build
```

## 🔌 API Endpoints

### POST `/gemini/ask`
Conducts the AI interview session.

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

## 🤖 AI Tools

The system uses three main AI tools:

1. **Introduction Tool** (`introTool`)
   - Introduces the interviewer
   - Explains the interview process
   - Confirms user understanding

2. **Questions Tool** (`questionsTool`)
   - Asks 10 Excel questions (3 Easy, 4 Intermediate, 3 Advanced)
   - Evaluates responses with scoring
   - Provides feedback

3. **Conclusion Tool** (`conclusionTool`)
   - Provides final assessment
   - Summarizes performance
   - Concludes the interview

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`

2. **Google AI API Error**
   - Verify API key is correct
   - Check API key permissions

3. **Port Already in Use**
   - Backend: Change PORT in `.env`
   - Frontend: Vite will automatically use next available port

4. **Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

## 📝 Development

### Adding New Questions
Edit `backend/tools/questions.ts` to modify the question bank.

### Customizing AI Behavior
Modify `backend/systemprompt.ts` to change AI instructions.

### Styling Changes
Update `Frontend/src/GeminiChat.css` for UI modifications.

## �� Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Set production environment variables
3. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service

## �� License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## �� Support

For issues and questions, please create an issue in the repository.
