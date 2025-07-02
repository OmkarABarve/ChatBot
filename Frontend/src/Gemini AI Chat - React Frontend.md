# Gemini AI Chat - React Frontend

This React frontend component connects to your NestJS backend with Gemini API integration.

## 🚀 Quick Setup

### 1. **Copy Files to Your React Project**

Copy these files to your existing Vite React project:

```
src/
├── components/
│   ├── GeminiChat.jsx     👈 Main component
│   └── GeminiChat.css     👈 Styles
├── App.jsx                👈 Updated App component
└── App.css                👈 Global styles
```

### 2. **Update Your Project Structure**

If you don't have a `components` folder, create one:

```bash
mkdir src/components
```

Then move the files:
- `GeminiChat.jsx` → `src/components/GeminiChat.jsx`
- `GeminiChat.css` → `src/components/GeminiChat.css`
- `App.jsx` → `src/App.jsx` (replace existing)
- `App.css` → `src/App.css` (replace existing)

### 3. **Enable CORS in Your NestJS Backend**

Add CORS support to your NestJS backend in `main.ts`:

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Vite dev server
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(3000);
}
bootstrap();
```

### 4. **Start Both Servers**

**Backend (NestJS):**
```bash
cd backend
npm run start:dev
```

**Frontend (React + Vite):**
```bash
cd frontend
npm run dev
```

## 🎯 Features

- **Clean UI**: Modern, responsive design
- **Real-time Loading**: Shows loading state while waiting for Gemini
- **Error Handling**: Displays user-friendly error messages
- **Mobile Responsive**: Works on all device sizes
- **Textarea Input**: Multi-line prompt support
- **Clear Function**: Reset form easily

## 🔧 API Integration

The component sends requests to:
```
POST http://localhost:3000/gemini/ask
```

With body:
```json
{
  "prompt": "Your question here"
}
```

Expected response:
```json
{
  "response": "Gemini's answer here"
}
```

## 🎨 Customization

### Change Colors
Edit the CSS variables in `GeminiChat.css`:

```css
/* Update the gradient colors */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

### Modify API Endpoint
Update the fetch URL in `GeminiChat.jsx`:

```javascript
const res = await fetch('http://your-backend-url/gemini/ask', {
  // ... rest of config
});
```

## 🐛 Troubleshooting

### CORS Issues
If you see CORS errors:
1. Make sure your backend has CORS enabled (see step 3)
2. Check that the frontend URL matches the CORS origin
3. Restart both servers

### Connection Refused
If you get "connection refused":
1. Ensure your NestJS backend is running on port 3000
2. Check that the API endpoint `/gemini/ask` exists
3. Verify your Gemini API key is set in backend `.env`

### Styling Issues
If styles don't load:
1. Make sure `GeminiChat.css` is imported in `GeminiChat.jsx`
2. Check that the CSS file path is correct
3. Clear browser cache and restart dev server

## 📱 Mobile Support

The component is fully responsive and includes:
- Touch-friendly buttons
- Optimized text sizes
- Flexible layouts for small screens
- Proper viewport handling

## 🔒 Security Notes

- The API key is stored securely in your backend `.env`
- Frontend never exposes sensitive credentials
- CORS is configured to only allow your frontend domain
- Input validation prevents empty requests

Enjoy chatting with Gemini! 🤖✨

