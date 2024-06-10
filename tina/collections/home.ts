import { Collection } from "tinacms";

export const HomePageCollection: Collection = {
    name: "home",
    label: "Home",
    path: "content/pages",
    format: "md",
    ui: {
        router: () => "/",
    },
    fields: [
        {
            type: "image",
            name: "logo",
            label: "Logo",
        },
        {
            type: "object",
            name: "menu",
            label: "Menu",
            list: true,
            fields: [
                { type: "string", name: "label" },
                { type: "string", name: "link" },
            ],
        },
        {
            type: "object",
            name: "demo_button",
            label: "Demo Button Label",
            fields: [
                { type: "string", name: "label" },
                { type: "string", name: "url" },
            ],
        },
        {
            type: 'object',
            name: 'hero-banner',
            label: 'Hero Banner',
            fields: [
                {
                    type: 'string', name: 'bannerTitle',
                },
                {
                    type: 'string', name: 'bannerDescription',
                },
                {
                    type: 'image', name: 'bannerImage',
                },
            ]
        },
        {
            type: 'rich-text',
            name: 'mission',
            label: 'Mission',
        },
        {
            type: 'rich-text',
            name: 'vision',
            label: 'Vision',
        },
        {
            type: 'rich-text',
            name: 'technology',
            label: 'Technology',
        },
    ],
};
