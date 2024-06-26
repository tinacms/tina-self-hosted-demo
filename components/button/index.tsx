import React from 'react'
import { cn } from '../../utils/cn'

export default function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className={cn('bg-brandSecondary text-white border-2 border-transparent transition duration-700 ease-in-out hover:shadow-brandPrimary-500/50 hover:shadow-brandPrimary-500/50  hover:opacity-70 rounded-md', className)}>{children}</button>
    )
}
