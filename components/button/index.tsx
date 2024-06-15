import React from 'react'
import { cn } from '../../utils/cn'

export default function Button({ children, className }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={cn('bg-brandSecondary text-white border-2 border-transparent hover:border-black hover:bg-transparent hover:text-black rounded-md', className)}>{children}</button>
    )
}
