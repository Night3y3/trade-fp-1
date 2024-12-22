import { FC, ReactNode } from 'react'
import Navbar from './Navbar'

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-black text-amber-100 font-mono w-full h-full">
            <Navbar />
            <main className="container mx-auto px-4 py-8 w-full h-full">
                {children}
            </main>
        </div>
    )
}

export default Layout

