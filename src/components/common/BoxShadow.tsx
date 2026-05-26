import React from 'react'
import { cn } from '@/lib/utils'

interface BoxShadowProps {
  children: React.ReactNode
  className?: string
}

const BoxShadow = ({ children, className }: BoxShadowProps) => {
  return (
    <div className={cn(
      "relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.6),inset_10px_10px_20px_rgba(255,255,255,0.15),inset_-10px_-10px_20px_rgba(255,255,255,0.05)]",
      className
    )}>
      {children}
    </div>
  )
}

export default BoxShadow
