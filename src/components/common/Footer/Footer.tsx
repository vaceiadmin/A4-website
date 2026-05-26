"use client"

import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import LocalizedLink from '@/components/common/LocalizedLink'
import { stripLocaleFromPathname } from '@/lib/localized-path'
import GetStartedHero from './GetStartedHero'

const Logo = '/assets/images/Logo.png'

const Footer = () => {
  const pathname = usePathname()
  const { t } = useTranslation('common')
  const barePath = stripLocaleFromPathname(pathname)
  const hideChromeRoutes = [
    '/privacy-policy',
    '/terms-and-conditions',
    '/cookie-policy',
  ]

  if (hideChromeRoutes.includes(barePath)) {
    return null
  }

  return (
    <footer className="w-full relative overflow-hidden ">
      {/* Split background: top white, bottom light grey */}
      <div className="absolute inset-0 -z-20 bg-white " />
      <div className="absolute top-0 left-0 right-0 h-[260px] md:h-[300px] -z-10 bg-background" />
      {/* GetStartedHero - Positioned above footer content with spacing */}
      <div className="relative w-full -mt-48 md:-mt-56 mb-16 flex justify-center">
        {!pathname.includes('/careers') && <GetStartedHero />}
      </div>

      {/* Radial Gradient Pattern Images - Bottom left and right */}
      <div className="pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[350px] h-[330px]  transform -rotate-360">
          <Image
            src="/assets/images/radial3.png"
            alt="Radial Gradient Pattern"
            fill

          />
        </div>
        <div className="absolute bottom-0 right-0 w-[350px] h-[330px]  transform -rotate-90">
          <Image
            src="/assets/images/radial3.png"
            alt="Radial Gradient Pattern"
            fill

          />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8  pb-12 lg:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          {/* Column 1 - Logo and Description */}
          <div className="space-y-4">
            <LocalizedLink href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center">
                <Image
                  src={Logo}
                  alt="VACEI"
                  width={120}
                  height={56}
                  className="object-contain"
                />
              </div>
            </LocalizedLink>

            <p className="text-sm text-gray leading-relaxed">
              {t('footer.tagline')}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.linkedin.com/company/officialvacei/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-primary-blue rounded-full text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>

          </div>

          <div className="space-y-4">
            <h3 className="text-text-dark font-bold text-base">{t('footer.platform')}</h3>
            <ul className="space-y-2">
              <li>
                <LocalizedLink href="/" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.overview')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/how-it-works" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.howItWorks')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/pricing" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.pricing')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/security-compliance" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.security')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/#why-vacei" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.whyVacei')}
                </LocalizedLink>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-text-dark font-bold text-base">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li>
                <LocalizedLink href="/services/corporate" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.corporate')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/services/audit" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.audit')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/services/accounting" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.accounting')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/services/tax" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.tax')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/services/legal" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.legal')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/services/vat-payroll" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.vatPayroll')}
                </LocalizedLink>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-text-dark font-bold text-base">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <LocalizedLink href="/about" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.about')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/faq" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.faqs')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/insights" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.insights')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/white-label-platform" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.whiteLabelLanding')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/partners-platform" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.partnerPlatformLanding')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/contact" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.contact')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/cpe" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  {t('footer.cpePodcast')}
                </LocalizedLink>
              </li>
            </ul>
          </div>

          {/* Column 5 - Contact Us */}
          <div className="space-y-4">
            <h3 className="text-text-dark font-bold text-base">{t('footer.contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <div className="flex flex-col leading-tight">
                  <a href="tel:+35677142418" className="text-sm text-gray hover:text-primary-blue transition-colors">
                    +356 77142418
                  </a>
                  <a href="tel:+4407400487907" className="text-sm text-gray hover:text-primary-blue transition-colors">
                    +44 07400 487907
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <a href="mailto:info@vacei.com" className="text-sm text-gray hover:text-primary-blue transition-colors">
                  info@vacei.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="text-sm text-gray">
                  A4, Triq San Giljan, San Gwann, Malta.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-4xl">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className=" max-w-6xl mx-auto relative z-10 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray">
            <div className="flex flex-wrap items-center gap-4">
              <LocalizedLink href="/terms-and-conditions" className="hover:text-primary-blue transition-colors">
                {t('footer.terms')}
              </LocalizedLink>
              <span className="text-light-gray">|</span>
              <LocalizedLink href="/privacy-policy" className="hover:text-primary-blue transition-colors">
                {t('footer.privacy')}
              </LocalizedLink>
              <span className="text-light-gray">|</span>
              <LocalizedLink href="/cookie-policy" className="hover:text-primary-blue transition-colors">
                {t('footer.cookies')}
              </LocalizedLink>
            </div>
            <div className="text-light-gray">
              {t('footer.copyright')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
