import Link from "next/link"
import { Menu, Search, User, Settings } from "lucide-react"
import { Button } from "../components/ui/button"

export default function Header() {
    return (
        <header className="bg-[#0F1419] border-b border-[#1A1F26] sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-4 md:py-6">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <div className="bg-[#5A8A8D] w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#0F1419"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5"
                                >
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-[#C5C5C5]">EngineAI</span>
                        </div>

                        <nav className="hidden md:ml-10 md:flex md:space-x-8">
                            <Link href="#" className="text-[#C5C5C5] hover:text-[#5A8A8D] px-3 py-2 text-sm font-medium">
                                Home
                            </Link>
                            <Link href="#" className="text-[#5A8A8D] px-3 py-2 text-sm font-medium">
                                Q&A Tool
                            </Link>
                            <Link href="#" className="text-[#C5C5C5] hover:text-[#5A8A8D] px-3 py-2 text-sm font-medium">
                                Resources
                            </Link>
                            <Link href="#" className="text-[#C5C5C5] hover:text-[#5A8A8D] px-3 py-2 text-sm font-medium">
                                About
                            </Link>
                        </nav>
                    </div>

                    {/* Right side - Search and User */}
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="text-[#C5C5C5] hover:text-[#5A8A8D] hover:bg-[#1A1F26]">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>

                        <Button variant="ghost" size="icon" className="text-[#C5C5C5] hover:text-[#5A8A8D] hover:bg-[#1A1F26]">
                            <Settings className="h-5 w-5" />
                            <span className="sr-only">Settings</span>
                        </Button>

                        <Button className="bg-[#1A1F26] hover:bg-[#1A1F26]/80 text-[#C5C5C5]">
                            <User className="h-5 w-5 mr-2" />
                            <span>Sign In</span>
                        </Button>

                        <Button variant="ghost" size="icon" className="md:hidden text-[#C5C5C5] hover:bg-[#1A1F26]">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
