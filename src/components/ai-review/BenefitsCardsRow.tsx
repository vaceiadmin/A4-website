import React from 'react'
import Image from 'next/image'
import TextAnimation from '../common/TextAnimation'

export interface BenefitCard {
    icon: string
    title: string
    description: string
    bullets?: string[]
}

interface BenefitsCardsRowProps {
    cards: BenefitCard[]
    columns?: number
}

const BenefitsCardsRow = ({ cards, columns = 3 }: BenefitsCardsRowProps) => {
    const gridCols =
        columns === 4
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1 md:grid-cols-3'

    return (
        <section className="bg-background ">
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
                <div className={`grid ${gridCols} gap-6 lg:gap-8`}>
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-primary-blue rounded-2xl px-7 py-8 text-left text-white shadow-md"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-benefit-icon border border-benefit-icon flex items-center justify-center mb-5">
                                <Image
                                    src={card.icon}
                                    alt={card.title}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                />
                            </div>
                            <TextAnimation
                                text={card.title}
                                as="h3"
                                className="text-xl font-semibold mb-3 leading-snug"
                            />
                            <p className="text-sm  leading-relaxed mb-4">
                                {card.description}
                            </p>
                            {card.bullets && card.bullets.length > 0 && (
                                <ul className="mt-2 space-y-1 text-xs text-light-gray">
                                    {card.bullets.map((item, idx) => (
                                        <li key={idx} className="list-disc list-inside">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BenefitsCardsRow


