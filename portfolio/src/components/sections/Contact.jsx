import { memo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Smartphone, Github, Linkedin, Send } from 'lucide-react';
import Button from '../ui/Button';
import { fadeUpVariants, fadeUpDelayedVariants, VIEWPORT } from '../../hooks/useScrollReveal';

const Contact = memo(function Contact() {
    return (
        <section id="contact" className="py-32 md:py-48 relative bg-transparent w-full min-h-screen flex items-center z-10 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                    {/* Left SIDE */}
                    <div className="flex flex-col">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-sm font-bold tracking-[0.3em] uppercase text-indigo-400 mb-6"
                        >
                            LET'S CONNECT
                        </motion.h2>

                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-premium text-white mb-8"
                        >
                            Start a <br /><span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">Conversation.</span>
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-white/50 leading-relaxed mb-16 max-w-lg font-light tracking-tight"
                        >
                            Have an exciting project in mind or looking for a dedicated Developer? Let's build something exceptional together.
                        </motion.p>

                        {/* CONTACT LINKS */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="grid grid-cols-2 gap-4 lg:gap-6"
                        >
                            <ContactLink
                                href="https://github.com/tkarthikraja44-ux"
                                icon={<Github size={20} />}
                                label="GitHub"
                                external
                            />
                            <ContactLink
                                href="https://www.linkedin.com/in/karthik-raja-thavamani/"
                                icon={<Linkedin size={20} />}
                                label="LinkedIn"
                                external
                            />
                            <ContactLink
                                href="mailto:tkarthikraja44@gmail.com"
                                icon={<Mail size={20} />}
                                label="Email"
                            />
                            <ContactLink
                                href="tel:+919080553499"
                                icon={<Smartphone size={20} />}
                                label="Phone"
                            />
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE FORM */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-[3rem] blur-3xl opacity-50" />

                        <motion.form
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative p-10 md:p-12 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl space-y-8"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <h4 className="text-2xl font-bold text-white tracking-tight">Send a Message</h4>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-widest text-white/30 uppercase ml-1">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.03] transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-widest text-white/30 uppercase ml-1">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.03] transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-widest text-white/30 uppercase ml-1">Message</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Your Message..."
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.03] transition-all resize-none"
                                    />
                                </div>

                                <div className="relative group/btn w-full">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-30 group-hover/btn:opacity-60 transition duration-500"></div>
                                    <Button
                                        variant="primary"
                                        className="w-full py-5 text-lg font-bold group/send relative bg-white text-black hover:bg-gray-100"
                                    >
                                        <span>Send Message</span>
                                        <Send size={18} className="ml-2 group-hover/send:translate-x-1 group-hover/send:-translate-y-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </motion.form>
                    </div>
                </div>
            </div>
        </section>
    );
});

const ContactLink = memo(function ContactLink({ href, icon, label, external }) {
    return (
        <motion.a
            href={href}
            target={external ? "_blank" : "_self"}
            rel={external ? "noopener noreferrer" : ""}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl flex flex-col items-center gap-4 transition-all duration-500 hover:bg-white/[0.05] hover:border-indigo-500/30 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] group text-center overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 text-white/70 group-hover:text-indigo-400 relative z-10 shadow-lg">
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">{icon}</div>
            </div>
            <span className="text-xs font-bold tracking-widest text-white/40 group-hover:text-white transition-colors duration-500 uppercase relative z-10">{label}</span>
        </motion.a>
    );
});

export default Contact;