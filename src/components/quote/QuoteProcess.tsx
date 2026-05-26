"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProcessCard {
    id: number
    title: string
    description: string
    points: string[]
    conclusion: string
    image: string
}

const QuoteProcess = () => {
    const processCards: ProcessCard[] = [
        {
            id: 1,
            title: "What We Ask For",
            description: "The quote request form collects basic information only, such as:",
            points: [
                "Business details",
                "Current status (operating, newly formed, not yet incorporated)",
                "Services required",
                "Estimated size or activity level"
            ],
            conclusion: "This allows us to scope services accurately from the start.",
            image: "/assets/images/What We Ask For.png"
        },
        {
            id: 2,
            title: "What You Receive",
            description: "Once we receive your information, we prepare and send you:",
            points: [
                "A clear, tailored quote based on your specific needs",
                "Detailed breakdown of services and pricing",
                "Timeline for service delivery",
                "Next steps to get started"
            ],
            conclusion: "You'll receive everything you need to make an informed decision.",
            image: "/assets/images/What You Receive.png"
        },
        {
            id: 3,
            title: "What Happens Next",
            description: "After you receive your quote, the process continues:",
            points: [
                "Review the quote at your convenience",
                "Schedule a call to discuss any questions",
                "Decide if you'd like to proceed",
                "We handle all onboarding and setup"
            ],
            conclusion: "There is no obligation to proceed - the choice is yours.",
            image: "/assets/images/What Happens Next.png"
        },
        {
            id: 4,
            title: "Why VACEI Quotes Are Different",
            description: "Our approach to quoting is designed to be transparent and helpful:",
            points: [
                "No hidden fees or surprise charges",
                "Clear pricing based on your actual needs",
                "Personalized service recommendations",
                "Transparent communication throughout"
            ],
            conclusion: "We believe in honest, upfront pricing that helps you make the right decision.",
            image: "/assets/images/Open source-pana 1.png"
        }
    ]

    return (
        <section id="quote-section-2" className="py-16 lg:py-24 bg-section-light">
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 lg:mb-16"
                >
                    <div className="inline-block mb-4">
                        <button className="border-dashed border-2 border-black text-black text-xs font-medium uppercase tracking-wider px-4 py-2 rounded border border-gray-300">
                            CONTACT US
                        </button>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-heading mb-4">
                        Get a Clean Quote For Your Business
                    </h2>
                    <p className="text-base md:text-lg text-gray max-w-3xl mx-auto leading-relaxed">
                        Tell us a few details about your business and the services you require. Based on your information, we prepare a clear, tailored quote and send it to you by email. There is no obligation to proceed.
                    </p>
                </motion.div>

                {/* Process Cards */}
                <div className="space-y-6 lg:space-y-8">
                    {processCards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-primary rounded-2xl shadow-lg overflow-hidden"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-6 md:p-8 lg:p-12">
                                {/* Left Side: Text Content */}
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
                                        {card.title}
                                    </h3>
                                    <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed">
                                        {card.description}
                                    </p>
                                    
                                    <ul className="space-y-3 mb-6">
                                        {card.points.map((point, pointIndex) => (
                                            <li key={pointIndex} className="flex items-start gap-3 text-base md:text-lg text-white">
                                                <span className="mt-2 w-2 h-2 rounded-full bg-white flex-shrink-0"></span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    <p className="text-base md:text-lg text-white/90 leading-relaxed">
                                        {card.conclusion}
                                    </p>
                                </div>

                                {/* Right Side: Illustration */}
                                <div className="flex items-center justify-center lg:justify-end">
                                    <div className="relative w-full max-w-md h-[300px] lg:h-[400px] bg-white rounded-2xl">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default QuoteProcess

