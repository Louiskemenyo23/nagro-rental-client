"use client";

import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialSlider = () => {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch('/api/testimonials');
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setTestimonials(data);
                } else {
                    // Fallback to default if empty
                    setTestimonials([
                        {
                            _id: 1,
                            name: "Sarah Osei",
                            role: "Bride",
                            content: "Nagor Rental & Decor made my wedding absolutely magical! The floral arrangements were breathtaking, and the gold phoenix chairs added such a regal touch. Highly recommended!",
                            initial: "S"
                        },
                    ]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchTestimonials();
    }, []);

    const next = () => {
        if (testimonials.length === 0) return;
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        if (testimonials.length === 0) return;
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, []);

    const variants = {
        enter: { opacity: 0, x: 100, scale: 0.9 },
        center: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: -100, scale: 0.9 }
    };

    return (
        <div className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
            {/* Animated Background Elements */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 space-y-3">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold tracking-[0.2em] uppercase text-xs bg-primary/10 px-3 py-1.5 rounded-full inline-block"
                    >
                        Success Stories
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-heading font-bold text-secondary"
                    >
                        Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-600">Clients</span>
                    </motion.h2>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="relative aspect-[16/10] md:aspect-[21/9] flex items-center justify-center min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {testimonials.length > 0 && testimonials[current] && (
                                <motion.div
                                    key={testimonials[current]._id}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="absolute w-full"
                                >
                                    <div className="relative bg-white/70 backdrop-blur-xl border border-white/50 p-8 md:p-10 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] text-center group hover:shadow-[0_30px_60px_-20px_rgba(212,175,55,0.15)] transition-shadow duration-500">

                                        {/* Ornamental Quote Icon */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary to-amber-600 w-12 h-12 rounded-xl rotate-3 shadow-lg shadow-primary/30 flex items-center justify-center text-white">
                                            <Quote size={20} fill="currentColor" />
                                        </div>

                                        <div className="mt-4 mb-6 flex justify-center gap-1.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} className="fill-primary text-primary" />
                                            ))}
                                        </div>

                                        <blockquote className="text-lg md:text-2xl font-heading leading-relaxed text-secondary mb-8 text-balance">
                                            "{testimonials[current].content}"
                                        </blockquote>

                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white shadow-md flex items-center justify-center text-lg font-bold text-gray-400 mb-2">
                                                {testimonials[current].initial}
                                            </div>
                                            <div>
                                                <h5 className="text-lg font-bold text-secondary">{testimonials[current].name}</h5>
                                                <p className="text-primary font-medium text-xs mt-0.5 uppercase tracking-wide opacity-80">{testimonials[current].role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-between items-center mt-12 px-4 md:px-0 max-w-xs mx-auto">
                        <button
                            onClick={prev}
                            className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-primary hover:border-primary hover:text-white transition-all flex items-center justify-center shadow-sm hover:shadow-lg hover:-translate-x-1"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrent(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${current === idx ? "w-8 bg-primary" : "w-2 bg-gray-300 hover:bg-primary/50"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-primary hover:border-primary hover:text-white transition-all flex items-center justify-center shadow-sm hover:shadow-lg hover:translate-x-1"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSlider;
