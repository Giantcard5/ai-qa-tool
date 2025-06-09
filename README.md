# EngineAI – AI Question Answering Tool

Empowering engineering students with AI-powered learning tools and resources.

## Overview

EngineAI is a web application that allows users to upload course material (PDF) and a set of questions (HTML). The app uses advanced AI (Google Gemini API) to analyze the material and generate highly accurate answers for the questions, following a rigorous workflow for maximum reliability.

## Features

- **Upload PDF and HTML files:** Users can upload a PDF with course content and an HTML file containing questions.
- **AI-powered answers:** The backend uses a detailed prompt and the Gemini API to generate answers with justifications.
- **Modern UI:** Clean, responsive interface with drag-and-drop file upload, loading states, and results display.
- **Export results:** Download the generated Q&A for further use.
- **High accuracy workflow:** The AI follows a multi-step process for deep analysis, web research, and answer validation.

## How It Works

1. **User uploads files:** PDF (course material) and HTML (questions).
2. **Backend processing:**
   - Loads a detailed prompt from `src/utils/prompts/read-file.md`.
   - Converts files to base64 and sends them, along with the prompt, to the Gemini API.
   - Receives a JSON-formatted answer set, parses it, and returns it to the frontend.
3. **Frontend displays results:** Questions and AI-generated answers are shown in a user-friendly format.

## Project Structure

```
src/
  app/
    api/
      upload/
        route.ts        # API route for file upload and AI processing
    page.tsx            # Main UI page (file upload, results, etc.)
    layout.tsx          # App layout
    globals.css         # Global styles
  components/
    header.tsx          # App header and navigation
    footer.tsx          # App footer and links
    ui/
      button.tsx        # Reusable button component
  utils/
    prompts/
      prompt.ts         # Loads the AI prompt from markdown
      read-file.md      # The detailed AI prompt (in Portuguese)
  lib/
    utils.ts            # Utility for className merging (Tailwind)
```

## Detailed Workflow

The AI prompt (see `src/utils/prompts/read-file.md`) instructs the model to:

- Deeply analyze the PDF, mapping concepts, terms, and relationships.
- Extract all questions and alternatives from the HTML.
- For each question, match relevant content in the PDF, perform web research if needed, and generate a clear, justified answer.
- Validate each answer for accuracy (~99.8%).
- Return only a JSON array of `{ question, answer }` objects.

## API

### POST `/api/upload`

**Request:**  
- `multipart/form-data` with fields:
  - `pdfFile`: PDF file (course material)
  - `htmlFile`: HTML file (questions)

**Response:**  
- JSON array of Q&A objects:
  ```json
  [
    {
      "question": "Rewritten question text",
      "answer": "A - Justification for the correct answer, and why others are not correct."
    },
    ...
  ]
  ```

## Setup & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set environment variables:**
   - `GEMINI_API_URL`: URL for the Gemini API endpoint.
   - `GEMINI_API_KEY`: Your Gemini API key.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**  
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

- **Prompt:** Edit `src/utils/prompts/read-file.md` to change the AI's workflow or instructions.
- **UI:** Modify components in `src/components/` for branding or layout changes.

## Technologies Used

- **Next.js** (App Router)
- **React** (with hooks)
- **Tailwind CSS** (utility-first styling)
- **Google Gemini API** (AI backend)
- **TypeScript** (type safety)