import { Collection } from "tinacms";

export const HomePageCollection: Collection = {
  name: "home",
  label: "Home",
  path: "content/pages/home",
  format: "md",
  ui: {
    router: () => "/",
  },
  fields: [
    {
      type: "object",
      name: "heroBanner",
      label: "Hero Banner",
      fields: [
        {
          type: 'string',
          name: 'heroBannerTitle',
          label: 'Hero Banner Title'
        },
        {
          type: 'string',
          name: 'heroBannerDescription',
          label: 'Hero Banner Description'
        },
      ]
    },
    {
      type: "object",
      name: "partners",
      label: "Partners",
      fields: [
        { type: "string", name: "title", label: 'Title' },
        {
          type: 'object',
          name: 'partnersInfo',
          label:'Partners Info',
          list: true,
          fields: [
            { type: "image", name: "partnerImage", label: 'Partner Image' },
            { type: "string", name: "partnerName", label: 'Partner Name' },
          ]
        }
      ],
    },
    {
      type: "object",
      name: "mission",
      label: "Mission",
      fields: [
        { type: "string", name: "missionTitle", label: 'Mission Title' },
        {
          type: 'rich-text',
          name: 'missionDescription',
          label: 'Mission Description',
        }
      ],
    },
    {
      type: "object",
      name: "vision",
      label: "Vision",
      fields: [
        { type: "string", name: "visionTitle", label: 'Vision Title' },
        {
          type: 'rich-text',
          name: 'visionDescription',
          label: 'Vision Description',
        }
      ],
    },
    {
      type: "object",
      name: "technology",
      label: "Technology",
      fields: [
        { type: "string", name: "technologyTitle", label: 'Technology Title' },
        {
          type: 'rich-text',
          name: 'technologyDescription',
          label: 'Technology Description',
        }
      ],
    },
  ],
};
