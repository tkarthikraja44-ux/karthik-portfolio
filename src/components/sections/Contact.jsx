import { memo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Smartphone, Github, Linkedin, Send } from 'lucide-react';
import Button from '../ui/Button';
import { fadeUpVariants, fadeUpDelayedVariants, VIEWPORT } from '../../hooks/useScrollReveal';

const Contact = memo(function Contact() {
    return (
        <section
            id="contact"
            className="py-16 sm:py-20 md:py-24 lg:py-32 relative bg-transparent w-full min-h-screen flex items-center z-10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-24">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col justify-center">

                        <motion.h2
                            variants={fadeUpVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={VIEWPORT}
                            className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-3 ml-1"
                        >
                            Let's Connect
                        </motion.h2>

                        <motion.h3
                            variants={fadeUpDelayedVariants(0.1)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={VIEWPORT}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-white mb-5 sm:mb-8"
                        >
                            Start a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                                Conversation.
                            </span>
                        </motion.h3>

                        <motion.p
                            variants={fadeUpDelayedVariants(0.2)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={VIEWPORT}
                            className="text-sm sm:text-base md:text-xl text-white/60 mb-8 sm:mb-12 font-light max-w-lg leading-relaxed"
                        >
                            Have an exciting project in mind or looking for a dedicated Developer?
                            Let's build something beautiful together.
                        </motion.p>

                        {/* CONTACT LINKS */}

                        <motion.div
                            variants={fadeUpDelayedVariants(0.3)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={VIEWPORT}
                            className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12"
                        >

                            <ContactLink
                                href="https://github.com/tkarthikraja44-ux"
                                icon={<Github size={20} className="text-white/80 group-hover:text-white" />}
                                label="GitHub"
                                external
                            />

                            <ContactLink
                                href="https://www.linkedin.com/in/karthik-raja-thavamani/"
                                icon={<Linkedin size={20} className="text-blue-400 group-hover:text-blue-300" />}
                                label="LinkedIn"
                                external
                            />

                            <ContactLink
                                href="mailto:tkarthikraja44@gmail.com"
                                icon={<Mail size={20} className="text-rose-400 group-hover:text-rose-300" />}
                                label="Email"
                            />

                            <ContactLink
                                href="tel:+919080553499"
                                icon={<Smartphone size={20} className="text-emerald-400 group-hover:text-emerald-300" />}
                                label="Phone"
                            />

                        </motion.div>
                    </div>

                    {/* RIGHT SIDE FORM */}

                    <div className="flex items-center justify-center">

                        <motion.form
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="glass-card p-6 sm:p-8 md:p-12 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] w-full max-w-lg border border-white/10 bg-white/[0.02]"
                            onSubmit={(e) => e.preventDefault()}
                        >

                            <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8">
                                Send a Message
                            </h4>

                            <div className="space-y-4 sm:space-y-6">

                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-2 ml-1">
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        className="w-full bg-black/60 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-white placeholder-white/20 focus:outline-none focus:border-white/40 focus:bg-black/80 transition-colors text-sm sm:text-base min-h-[48px]"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-2 ml-1">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="w-full bg-black/60 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-white placeholder-white/20 focus:outline-none focus:border-white/40 focus:bg-black/80 transition-colors text-sm sm:text-base min-h-[48px]"
                                        placeholder="karthik@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-2 ml-1">
                                        Message
                                    </label>

                                    <textarea
                                        rows="4"
                                        className="w-full bg-black/60 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-white placeholder-white/20 focus:outline-none focus:border-white/40 focus:bg-black/80 transition-colors resize-none text-sm sm:text-base"
                                        placeholder="How can we collaborate?"
                                    />
                                </div>

                                <Button
                                    variant="primary"
                                    className="w-full mt-2 sm:mt-4 text-base sm:text-lg py-4 sm:py-5 px-4 sm:px-6 min-h-[52px]"
                                >
                                    <Send size={18} className="mr-2" />
                                    Send Message
                                </Button>

                            </div>
                        </motion.form>

                    </div>

                </div>
            </div>
        </section>
    );
});


/* CONTACT LINK COMPONENT */

const ContactLink = memo(function ContactLink({ href, icon, label, external }) {

    return (
        <motion.a
            href={href}
            target={external ? "_blank" : "_self"}
            rel={external ? "noopener noreferrer" : ""}
            whileHover={{ y: -4, scale: 1.03 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-2 sm:gap-4 hover:bg-white/[0.05] hover:border-white/20 transition-colors duration-300 relative overflow-hidden min-h-[80px] sm:min-h-[100px]"
        >

            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 shadow-inner">
                {icon}
            </div>

            <span className="font-medium text-white/60 group-hover:text-white transition-colors duration-300 relative z-10 text-xs sm:text-sm">
                {label}
            </span>

        </motion.a>
    );

});

export default Contact;