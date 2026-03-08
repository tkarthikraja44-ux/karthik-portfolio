import { memo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Smartphone, Github, Linkedin, Send } from 'lucide-react';
import Button from '../ui/Button';

const Contact = memo(function Contact() {
    return (
        <section
            id="contact"
            className="py-20 md:py-24 lg:py-32 relative bg-transparent w-full min-h-screen flex items-center z-10"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col justify-center">

                        <h2 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-3 ml-1">
                            Let's Connect
                        </h2>

                        <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-8">
                            Start a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                                Conversation.
                            </span>
                        </h3>

                        <p className="text-xl text-white/60 mb-12 font-light max-w-lg leading-relaxed">
                            Have an exciting project in mind or looking for a dedicated Developer?
                            Let's build something beautiful together.
                        </p>

                        {/* CONTACT LINKS */}

                        <div className="grid grid-cols-2 gap-6 mb-12">

                            <ContactLink
                                href="https://github.com/tkarthikraja44-ux"
                                icon={<Github size={24} className="text-white/80 group-hover:text-white" />}
                                label="GitHub"
                                external
                            />

                            <ContactLink
                                href="https://www.linkedin.com/in/karthik-raja-thavamani/"
                                icon={<Linkedin size={24} className="text-blue-400 group-hover:text-blue-300" />}
                                label="LinkedIn"
                                external
                            />

                            <ContactLink
                                href="mailto:tkarthikraja44@gmail.com"
                                icon={<Mail size={24} className="text-rose-400 group-hover:text-rose-300" />}
                                label="Email"
                            />

                            <ContactLink
                                href="tel:+919080553499"
                                icon={<Smartphone size={24} className="text-emerald-400 group-hover:text-emerald-300" />}
                                label="Phone"
                            />

                        </div>
                    </div>

                    {/* RIGHT SIDE FORM */}

                    <div className="flex items-center justify-center">

                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="glass-card p-8 md:p-12 rounded-[2.5rem] w-full max-w-lg border border-white/10 bg-white/[0.02]"
                            onSubmit={(e) => e.preventDefault()}
                        >

                            <h4 className="text-3xl font-bold text-white mb-8">
                                Send a Message
                            </h4>

                            <div className="space-y-6">

                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-2 ml-1">
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-white/40 focus:bg-black/80 transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-2 ml-1">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-white/40 focus:bg-black/80 transition-colors"
                                        placeholder="karthik@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-2 ml-1">
                                        Message
                                    </label>

                                    <textarea
                                        rows="4"
                                        className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-white/40 focus:bg-black/80 transition-colors resize-none"
                                        placeholder="How can we collaborate?"
                                    ></textarea>
                                </div>

                                <Button
                                    variant="primary"
                                    className="w-full mt-4 text-lg py-5 px-6"
                                >
                                    <Send size={20} className="mr-2" />
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
        <a
            href={href}
            target={external ? "_blank" : "_self"}
            rel={external ? "noopener noreferrer" : ""}
            className="group glass-card p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 relative overflow-hidden"
        >

            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 shadow-inner">
                {icon}
            </div>

            <span className="font-medium text-white/60 group-hover:text-white transition-colors duration-300 relative z-10">
                {label}
            </span>

        </a>
    );

});

export default Contact;