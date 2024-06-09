import React from 'react'

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    errorMessage?: string,
}
export default function Input({ label, required, errorMessage, ...props }: IInput) {
    return (
        <div className="flex flex-col">
            <label className="mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
            <input
                {...props}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-brandSecondary focus:outline-0 focus:ring-2 focus:ring-inset"
                style={{
                    borderWidth: '1px',
                    borderStyle: 'solid',
                }}
            />
            {errorMessage && <span className='text-red-500 text-sm'>{errorMessage}</span>}
        </div>
    )
}
