"use client"
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Input from '../../form/input'
import TextArea from '../../form/text-area'
// import Button from '../../button'
import { useState } from "react";
import Spinner from '../../loaders/spinner';
import { FadeIn } from '../../FadeIn';

export default function ContactForm() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
    });
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsFormSubmitting(true);
        const formAction = "https://docs.google.com/forms/d/e/1FAIpQLSe9PvH-X4uiBDU8RAQ7Tz2Yx_fa4GMxanxp2B4zHA_aM0AMIw/formResponse";
        const formFields = {
            'entry.36841487': formData.firstName,
            'entry.244118586': formData.lastName,
            'entry.1459667133': formData.email,
            'entry.623705129': formData.company,
            'entry.1891614370': formData.message
        };

        try {
            const response = await fetch(formAction, {
                method: 'POST',
                body: new URLSearchParams(formFields),
                mode: 'no-cors' // Note: 'no-cors' mode means the response is an opaque object
            });
            console.log('Form submitted', response);
            setSubmissionMessage('Thank you for your message. We will get back to you soon!');
        } catch (error) {
            console.error('Error submitting form', error);
            setSubmissionMessage('Failed to send message. Please try again later.');
        } finally {
            setIsFormSubmitting(false);
        }
    };

    return (
        <div className="relative isolate">
            <FadeIn className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                        <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                            <svg
                                className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                                aria-hidden="true"
                            >
                                <defs>
                                    <pattern
                                        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                                        width={200}
                                        height={200}
                                        x="100%"
                                        y={-1}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path d="M130 200V.5M.5 .5H200" fill="none" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" strokeWidth={0} fill="white" />
                                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                                </svg>
                                <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
                            </svg>
                        </div>
                        <h2 className="tracking-tight title underline underline-offset-8 decoration-brandSecondary">Contact Us</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Schedule a demo with one of our product consultants to learn more about our automated equipment for medical device manufacturing.
                        </p>
                        <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Address</span>
                                    <BuildingOffice2Icon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    1247 S Wright St,
                                    <br />
                                    Santa Ana, CA 92705
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Telephone</span>
                                    <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    <a className="hover:text-gray-900" href="tel:+1 (555) 234-5678">
                                        657-333-7818
                                    </a>
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Email</span>
                                    <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    <a className="hover:text-gray-900" href="mailto:contact@rtechinc.co">
                                        contact@rtechinc.co
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-24 m-auto">
                    <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                        {!submissionMessage && <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div className='col-span-2 sm:col-span-1'>
                                    <Input label='First Name' required type='text' name="firstName" value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div className='col-span-2 sm:col-span-1'>
                                    <Input label='Last Name' required type='text' name="lastName" value={formData.lastName} onChange={handleChange} />
                                </div>
                                <div className='col-span-2'>
                                    <Input label='Email' required type='email' name="email" value={formData.email} onChange={handleChange} />
                                </div>
                                <div className='col-span-2'>
                                    <Input label='Company' type='text' name="company" value={formData.company} onChange={handleChange} />
                                </div>
                                <div className='col-span-2'>
                                    <TextArea label='Write a message' name="message" value={formData.message} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button
                                    className="rounded-md  px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600   bg-brandSecondary text-white border-2 border-transparent hover:border-black hover:bg-transparent hover:text-black"
                                    type="submit"
                                    disabled={isFormSubmitting}
                                >
                                    {isFormSubmitting ? <Spinner /> : 'Send message'}
                                </button>
                            </div>
                        </form>}
                        {
                            <p className='flex justify-center items-center h-full'>
                                {!!submissionMessage && submissionMessage}
                            </p>
                        }
                    </div>
                </div>
            </FadeIn>
        </div>
    )
}