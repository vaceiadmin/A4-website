"use client";

import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import LocalizedLink from '@/components/common/LocalizedLink'
import { CALENDLY_DEMO_URL, CLIENT_ONBOARDING_URL } from '@/lib/external-links'

interface GetInstantQuoteButtonProps {
  hasShadow?: boolean
  className?: string
  variant?: 'default' | 'book-demo' | 'custom'
  text?: string
  href?: string
  bgColor?: string
  textColor?: string
  borderColor?: string
}

const GetInstantQuoteButton = ({ 
  hasShadow = true, 
  className = "", 
  variant = 'default',
  text,
  href,
  bgColor,
  textColor,
  borderColor
}: GetInstantQuoteButtonProps) => {
  const { t } = useTranslation('common')
  const defaultQuote = t('glossary.getInstantQuote')
  const defaultBookDemo = t('glossary.bookDemo')

  if (variant === 'custom') {
    return (
      <LocalizedLink
        href={href || CLIENT_ONBOARDING_URL}
        className={`
          inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all text-[15px] font-medium 
          ${bgColor ? '' : 'bg-primary-blue hover:bg-primary-blue-hover'}
          ${textColor ? '' : 'text-white'}
          ${borderColor ? 'border-2' : ''}
          ${hasShadow ? 'shadow-[0_4px_30px_var(--primary-blue-shadow)] hover:shadow-[0_6px_40px_var(--primary-blue-shadow)] transform hover:-translate-y-0.5' : 'hover:shadow-md hover:-translate-y-0.5'}
          ${className}
        `}
        style={{
          backgroundColor: bgColor || undefined,
          color: textColor || undefined,
          borderColor: borderColor || undefined
        }}
      >
        {text ?? defaultQuote}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </LocalizedLink>
    )
  }

  if (variant === 'book-demo') {
    return (
      <Link
        href={href || CALENDLY_DEMO_URL}
        className={`
          inline-flex items-center gap-2 bg-primary-blue hover:bg-primary-blue-hover text-white px-6 py-3 rounded-full transition-all text-[15px] font-medium transform hover:-translate-y-0.5
          ${hasShadow ? 'shadow-[0_4px_30px_var(--primary-blue-shadow)] hover:shadow-[0_6px_40px_var(--primary-blue-shadow)]' : ''}
          ${className}
        `}
      >
        {text ?? defaultBookDemo}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    )
  }

  return (
    <LocalizedLink
      href={href || CLIENT_ONBOARDING_URL}
      className={`
        inline-flex items-center gap-2 bg-primary-blue hover:bg-primary-blue-hover text-white px-6 py-3 rounded-full transition-all text-[15px] font-medium 
        ${hasShadow ? 'shadow-[0_4px_30px_var(--primary-blue-shadow)] hover:shadow-[0_6px_40px_var(--primary-blue-shadow)] transform hover:-translate-y-0.5' : ''}
        ${className}
      `}
    >
      {text ?? defaultQuote}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </LocalizedLink>
  )
}

export default GetInstantQuoteButton
