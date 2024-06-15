import { Collection } from "tinacms";

export const ProductCollection: Collection = {
  name: "product",
  label: "Product",
  path: "content/products",
  format: "md",
  ui: {
    router: () => "/",
  },
  fields: [
    {
      type: "string",
      name: "uniqueId",
      label: "UniqueId",
    },
    {
      type: "image",
      name: "productImages",
      label: "Product Images",
      list: true
    },
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "rich-text",
      name: "overviewDescription",
      label: "Overview Description",
    },
    {
      type: "rich-text",
      name: "description",
      label: "Description",
    },
    {
      type: 'object',
      name: 'disclosures',
      label: 'Disclosures',
      list: true,
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title'
        },
        {
          type: 'string',
          name: 'features',
          label: 'Features',
          list: true
        },
      ]
    }
  ],
};
