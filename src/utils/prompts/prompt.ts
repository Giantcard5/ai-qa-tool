// src/utils/prompts/prompt.ts

import fs from 'fs';
import path from 'path';

const promptMdPath = path.resolve(process.cwd(), 'src/utils/prompts/read-file.md');

export function loadPromptMarkdown(): string {
    try {
        return fs.readFileSync(promptMdPath, 'utf-8');
    } catch (error) {
        console.error('Error loading AI prompt markdown:', error);
        return '';
    }
}
