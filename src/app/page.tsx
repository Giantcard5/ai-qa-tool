"use client"

import type React from "react"

import { useState } from "react"

import { FileText, HelpCircle, Loader2, Send, Download, ChevronRight } from "lucide-react"

import { Button } from "../components/ui/button"

import Header from "../components/header"
import Footer from "../components/footer"

interface QAResult {
    question: string
    answer: string
}

export default function AIQuestionAnsweringTool() {
    const [pdfFile, setPdfFile] = useState<File | null>(null)
    const [htmlFile, setHtmlFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState<QAResult[]>([])
    const [dragOver, setDragOver] = useState<"pdf" | "html" | null>(null)

    const handleFileUpload = (file: File, type: "pdf" | "html") => {
        if (type === "pdf") {
            setPdfFile(file)
        } else {
            setHtmlFile(file)
        }
    }

    const handleDragOver = (e: React.DragEvent, type: "pdf" | "html") => {
        e.preventDefault()
        setDragOver(type)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(null)
    }

    const handleDrop = (e: React.DragEvent, type: "pdf" | "html") => {
        e.preventDefault()
        setDragOver(null)
        const files = e.dataTransfer.files
        if (files.length > 0) {
            handleFileUpload(files[0], type)
        }
    }

    const generateAnswers = async () => {
        if (!pdfFile || !htmlFile) {
            console.log('Nenhum arquivo selecionado')
            return
        }

        if (pdfFile.type !== 'application/pdf' || htmlFile.type !== 'text/html') {
            console.log('Arquivos inválidos')
            return
        }

        const formData = new FormData();
        formData.append('pdfFile', pdfFile);
        formData.append('htmlFile', htmlFile);

        setIsLoading(true)

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload files');
            }

            const data = await response.json();
            setResults(data)
            setIsLoading(false)
        } catch (error) {
            console.error('Error uploading files:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const FileUploadArea = ({
        type,
        file,
        onFileSelect,
        accept,
    }: {
        type: "pdf" | "html"
        file: File | null
        onFileSelect: (file: File) => void
        accept: string
    }) => (
        <div className="h-full">
            <div
                className={`relative border-2 border-dashed rounded-xl h-full flex flex-col transition-all duration-200 cursor-pointer group ${dragOver === type
                        ? "border-[#5A8A8D] bg-[#5A8A8D]/10"
                        : file
                            ? "border-[#5A8A8D] bg-[#5A8A8D]/5"
                            : "border-[#5A8A8D]/30 hover:border-[#5A8A8D]/60 hover:bg-[#5A8A8D]/5"
                    }`}
                onDragOver={(e) => handleDragOver(e, type)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, type)}
                onClick={() => document.getElementById(`${type}-input`)?.click()}
            >
                <input
                    id={`${type}-input`}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) onFileSelect(file)
                    }}
                />

                <div className="flex flex-col items-center justify-center space-y-4 p-8 h-full">
                    <div
                        className={`p-4 rounded-full transition-colors ${file ? "bg-[#5A8A8D]/20" : "bg-[#1A1F26] group-hover:bg-[#5A8A8D]/10"
                            }`}
                    >
                        {type === "pdf" ? (
                            <FileText className={`w-8 h-8 ${file ? "text-[#5A8A8D]" : "text-[#C5C5C5]/60"}`} />
                        ) : (
                            <HelpCircle className={`w-8 h-8 ${file ? "text-[#5A8A8D]" : "text-[#C5C5C5]/60"}`} />
                        )}
                    </div>

                    {file ? (
                        <div className="space-y-2 text-center">
                            <p className="text-[#C5C5C5] font-medium">{file.name}</p>
                            <p className="text-[#C5C5C5]/60 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    ) : (
                        <div className="space-y-2 text-center">
                            <p className="text-[#C5C5C5] font-medium">
                                {type === "pdf" ? "Upload PDF (Course Material)" : "Upload HTML (Questions)"}
                            </p>
                            <p className="text-[#C5C5C5]/60 text-sm">Choose a file or drag & drop it here</p>
                            <p className="text-[#C5C5C5]/60 text-xs">
                                {type === "pdf" ? "PDF files only" : "HTML files only"} • 50 MB max file size
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#0F1419] flex flex-col">
            <Header />

            <main className="flex-grow px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Main Content */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#C5C5C5] mb-4 text-center">
                            AI Question Answering Tool
                        </h1>
                        <p className="text-[#C5C5C5]/70 text-lg max-w-3xl mx-auto text-center">
                            Upload your course material and questions to get instant AI-powered answers for engineering students
                        </p>
                    </div>

                    {/* File Upload Section */}
                    <div className="bg-[#1A1F26] rounded-2xl shadow-xl p-6 md:p-8 mb-8 flex flex-col gap-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h2 className="text-xl font-semibold text-[#C5C5C5] mb-4">Course Material</h2>
                                <FileUploadArea
                                    type="pdf"
                                    file={pdfFile}
                                    onFileSelect={(file) => handleFileUpload(file, "pdf")}
                                    accept=".pdf"
                                />
                            </div>

                            <div className="space-y-3">
                                <h2 className="text-xl font-semibold text-[#C5C5C5] mb-4">Questions</h2>
                                <FileUploadArea
                                    type="html"
                                    file={htmlFile}
                                    onFileSelect={(file) => handleFileUpload(file, "html")}
                                    accept=".html"
                                />
                            </div>
                        </div>

                        {/* Generate Button */}
                        <div className="flex justify-center mt-12">
                            <Button
                                onClick={generateAnswers}
                                disabled={!pdfFile || !htmlFile || isLoading}
                                className="bg-[#5A8A8D] hover:bg-[#5A8A8D]/80 text-[#0F1419] font-semibold text-lg px-10 py-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-3">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Processing Files...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Send className="w-5 h-5" />
                                        <span>Generate Answers</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="bg-[#1A1F26] rounded-2xl shadow-xl p-8 text-center">
                            <div className="flex flex-col items-center space-y-6">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-[#5A8A8D]/20 border-t-[#5A8A8D] rounded-full animate-spin"></div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-[#C5C5C5]">Processing Your Files</h3>
                                    <p className="text-[#C5C5C5]/70">
                                        Our AI is analyzing your course material and questions. This may take a moment...
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Results Section */}
                    {results.length > 0 && !isLoading && (
                        <div className="space-y-6">
                            <div className="bg-[#1A1F26] rounded-2xl shadow-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-[#C5C5C5]">Questions & Answers</h2>
                                    <Button className="bg-[#5A8A8D]/20 hover:bg-[#5A8A8D]/30 text-[#5A8A8D]">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Results
                                    </Button>
                                </div>

                                <p className="text-[#C5C5C5]/70 mb-6">
                                    Found {results.length} questions with AI-generated answers based on your course material.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {results.map((result, index) => (
                                    <div key={index} className="bg-[#1A1F26] rounded-2xl shadow-xl p-6 border border-[#5A8A8D]/10">
                                        <div className="space-y-4">
                                            {/* Question */}
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <HelpCircle className="w-5 h-5 text-[#5A8A8D]" />
                                                    <h3 className="text-lg font-semibold text-[#5A8A8D]">Question {index + 1}</h3>
                                                </div>
                                                <p className="text-[#C5C5C5] font-medium text-lg leading-relaxed pl-7">{result.question}</p>
                                            </div>

                                            {/* Divider */}
                                            <div className="border-t border-[#5A8A8D]/20"></div>

                                            {/* Answer */}
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <ChevronRight className="w-5 h-5 text-[#5A8A8D]" />
                                                    <h4 className="text-lg font-semibold text-[#5A8A8D]">Answer</h4>
                                                </div>
                                                <p className="text-[#C5C5C5]/90 leading-relaxed pl-7">{result.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
