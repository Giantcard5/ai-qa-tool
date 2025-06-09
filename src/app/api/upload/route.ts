import { NextResponse } from 'next/server';

import { loadPromptMarkdown } from '../../../utils/prompts/prompt';

interface IRequest {
    contents: Array<{
        parts: Array<
            | { text: string }
            | { inlineData: { mimeType: 'application/pdf'; data: string } }
            | { inlineData: { mimeType: 'text/html'; data: string } }
        >;
    }>;
}

export async function POST(request: Request) {
    const formData = await request.formData();

    const pdfFile = formData.get('pdfFile') as File;
    const htmlFile = formData.get('htmlFile') as File;

    if (!pdfFile || !htmlFile) {
        return NextResponse.json({ error: 'Both files are required.' }, { status: 400 });
    };

    const prompt = loadPromptMarkdown();

    const pdfBase64 = Buffer.from(await pdfFile.arrayBuffer()).toString('base64');
    const htmlBase64 = Buffer.from(await htmlFile.arrayBuffer()).toString('base64');

    const response = await fetch(process.env.GEMINI_API_URL as string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': process.env.GEMINI_API_KEY as string
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType: 'application/pdf',
                                data: pdfBase64,
                            },
                        },
                        {
                            inlineData: {
                                mimeType: 'text/html',
                                data: htmlBase64,
                            },
                        },
                    ],
                },
            ],
        })
    })

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    let jsonString = text;
    if (text.startsWith('```')) {
        jsonString = jsonString.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, '');
    }

    return NextResponse.json(JSON.parse(jsonString));
}