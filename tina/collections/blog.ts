import { Collection, Form, TinaCMS } from "tinacms";

export const BlogCollection: Collection = {
    name: "blog",
    label: "Blog",
    path: "content/blogs",
    format: "md",
    ui: {
        router: () => "/blogs",
        beforeSubmit: async ({
            values,
        }: {
            form: Form
            cms: TinaCMS
            values: Record<string, any>
        }) => {
            return {
                ...values,
                createdAt: new Date().toISOString(),
            }
        },
    },
    fields: [
        {
            type: "string",
            name: "uniqueId",
            label: "UniqueId",
        },
        {
            type: "string",
            name: "keyWords",
            label: "Keywords",
            list: true
        },
        {
            type: "image",
            name: "overviewImage",
            label: "Overview Images",
        },
        {
            type: "image",
            name: "detailPageImage",
            label: "Detail Page Image",
        },
        {
            type: "string",
            name: "title",
            label: "Title",
        },
        {
            type: "datetime",
            name: "date",
            label: "Date",
        },
        {
            type: "datetime",
            name: "createdAt",
            label: "Created At",
        },
        {
            type: "rich-text",
            name: "blogContent",
            label: "Blog Content",
        },
    ],
};
