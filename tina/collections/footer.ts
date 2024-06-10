import { Collection } from "tinacms";

export const FooterCollection: Collection = {
    name: "footer",
    label: "Footer",
    path: "content/footer",
    format: "md",
    ui: {
        router: () => "/",
    },
    defaultItem: () => {
        return {
            footerLinks: [
                {
                    label: 'About',
                    link: '/about-us'
                },
                {
                    label: 'Contact',
                    link: '/contact-us'
                },
                {
                    label: 'Blog',
                    link: '/blogs'
                },
                {
                    label: 'Service',
                    link: '/service'
                },
            ],
            socialMediaIcons: [
                {
                    icon: 'instagram',
                    link: 'https://www.instagram.com/'
                },
                {
                    icon: 'facebook',
                    link: 'https://www.facebook.com/'
                },
            ],
            rights: '© 2024 Your Company, Inc. All rights reserved.'
        }
    },
    fields: [
        {
            type: 'object',
            name: "footerLinks",
            label: "Footer Links",
            list: true,
            fields: [
                { type: "string", name: "label" },
                { type: "string", name: "link" },
            ],
        },
        {
            type: 'object',
            name: "socialMediaIcons",
            label: "Social Media Icons",
            list: true,
            fields: [
                {
                    type: "string", name: "icon", options: [
                        { value: 'instagram', label: 'Instagram' },
                        { value: 'youtube', label: 'YouTube' },
                        { value: 'facebook', label: 'Facebook' },
                        { value: 'Twitter', label: 'twitter' },
                    ]
                },
                { type: "string", name: "link" },
            ],
        },
        {
            type: 'string',
            name: 'rights',
            label: 'Rights Description'
        }
    ],
};
