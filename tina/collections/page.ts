import { Collection } from "tinacms";

export const HomePageCollection: Collection = {
  name: "home",
  label: "Home",
  path: "content/pages",
  format: "md",
  defaultItem: () => {
    return {
      logo: 'logo',
      menu: [
        { label: 'Home', link: '/' },
        { label: 'about', link: '/about' }
      ]

    }
  },
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
  ],
};
