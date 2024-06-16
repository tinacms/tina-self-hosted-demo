import { Collection, Form, TinaCMS } from "tinacms";

export const ServiceCollection: Collection = {
    name: "services",
    label: "Services",
    path: "content/pages/services",
    format: "md",
    ui: {
        router: () => "/services",
    },
    fields: [
        {
            type: "string",
            name: "title",
            label: "Title",
        },
        {
            type: "rich-text",
            name: "description",
            label: "Description",
        },
        {
            type: "object",
            name: "services",
            label: "Services",
            list: true,
            fields: [
                {
                    type: 'string',
                    name: 'title',
                    label: 'Title'
                },
                {
                    type: 'rich-text',
                    name: 'serviceDescription',
                    label: 'Service Description'
                },
            ]
        },

    ],
};
