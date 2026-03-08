export default function Footer() {
    return (
        <footer className="w-full py-10 px-6 mt-20 border-t border-white/10 bg-black z-10 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-white/40">
                    © {new Date().getFullYear()} Karthik Raja T. Crafted with React & Framer Motion.
                </p>
                <div className="flex gap-6 text-sm text-white/40">
                    <a href="#about" className="hover:text-white transition-colors">About</a>
                    <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                    <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
