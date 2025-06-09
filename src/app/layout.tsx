import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'EngineAI',
    description: 'Empowering engineering students with AI-powered learning tools and resources.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
