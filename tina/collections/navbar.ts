import { Collection } from "tinacms";

export const NavbarCollection: Collection = {
    name: "navbar",
    label: "Navbar",
    path: "content/navbar",
    format: "md",
    ui: {
        router: () => "/",
    },
    defaultItem: () => {
        return {
            logo: '',
            menu: [
                {
                    label: 'Home',
                    link: '/'
                },
                {
                    label: 'Products',
                    link: '/products'
                },
                {
                    label: 'Services',
                    link: '/services'
                },
                {
                    label: 'Blogs',
                    link: '/blogs'
                },
            ]
        }
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
    ],
};