import { client } from "../tina/__generated__/databaseClient";

import Blog from "../components/features/blog";
import ContactForm from "../components/features/contact-form";
import Product from "../components/features/product";
import { IBlog } from "../types/blog";
import { IProduct } from "../types/product";
import HeroBannerText from "./_components/hero-banner-text";
import TrustedPartner from "./_components/trusted-partner";
import VisionMission from "./_components/vision-mission";
import Image from "next/image";

const products: IProduct[] = [
  {
    description: 'The NEXIV VMZ-S series offers speed and accuracy where high throughput is critical.',
    id: '1',
    imageUrl: 'https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2022/01/VMZ-S_Rev1_500.png',
    title: 'NEXIV VMZ-S Series'
  },
  {
    description: 'The NEXIV VMZ-S series offers speed and accuracy where high throughput is critical.',
    id: '2',
    imageUrl: 'https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2022/01/VMZ-S_Rev1_500.png',
    title: 'NEXIV VMZ-S Series'
  },
  {
    description: 'The NEXIV VMZ-S series offers speed and accuracy where high throughput is critical.',
    id: '3',
    imageUrl: 'https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2022/01/VMZ-S_Rev1_500.png',
    title: 'NEXIV VMZ-S Series'
  }
]
const blogs: IBlog[] = [
  {
    description: 'The NEXIV VMZ-S series offers speed and accuracy where high throughput is critical.',
    id: '1',
    imageUrl: 'https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2023/08/Tilted-CT-_-Computer-Chip_AdobeStock_616674263-1024x574.jpeg',
    title: 'Nikon-AAT3D integration ushers in new era of in-process metrology efficiency and precision',
    date: new Date()
  },
  {
    description: 'The NEXIV VMZ-S series offers speed and accuracy where high throughput is critical.',
    id: '2',
    imageUrl: 'https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2023/08/Tilted-CT-_-Computer-Chip_AdobeStock_616674263-1024x574.jpeg',
    title: 'Nikon-AAT3D integration ushers in new era of in-process metrology efficiency and precision',
    date: new Date()
  },
  {
    description: 'The NEXIV VMZ-S series offers speed and accuracy where high throughput is critical.',
    id: '3',
    imageUrl: 'https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2023/08/Tilted-CT-_-Computer-Chip_AdobeStock_616674263-1024x574.jpeg',
    title: 'Nikon-AAT3D integration ushers in new era of in-process metrology efficiency and precision',
    date: new Date()
  },
  {
    description: 'The NEXIV VMZ-S series offers speed and accuracy where high throughput is critical.',
    id: '4',
    imageUrl: 'https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2023/08/Tilted-CT-_-Computer-Chip_AdobeStock_616674263-1024x574.jpeg',
    title: 'Nikon-AAT3D integration ushers in new era of in-process metrology efficiency and precision',
    date: new Date()
  }
]

const brandImages = ['/brands/brand_1.webp', '/brands/brand_2.webp', '/brands/brand_3.webp']
export default async function Home() {
  const res = await client.queries.home({ relativePath: "home.md" });
  console.log(res.data.home.menu, 'res')
  return (
    <>
      {/* hero section */}
      <section className="w-full relative section_Divider md:min-h-[776px]">
        <Image src='https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2023/12/Nikon-Metrology-Innovative-measurement-solutions-for-your-shop-floor.jpg' alt="RTech-banner" width={1024} height={1636} className="md:hidden" />
        <video autoPlay loop muted playsInline preload="auto" className="w-full hidden md:block min-h-[776px] object-cover"><source type="video/mp4" src="https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2023/03/1131_NI_APDIS-website-header_19_CBR-2MB.mp4" /></video>
        <HeroBannerText />
      </section>

      {/* products section */}
      <section className="container mx-auto section_Divider">
        <h2 className="title">Products</h2>
        <div className="grid grid-cols-12 gap-4">
          {
            products.map((product) => <div key={product.id} className="col-span-12 md:col-span-6">
              <Product  {...product} />
            </div>
            )
          }
        </div>
      </section>

      {/* blog section */}
      <section className="container mx-auto section_Divider">
        <h2 className="title">Blogs</h2>
        <div className="grid grid-cols-12 gap-4">
          {
            blogs.map((blog) => <div key={blog.id} className="col-span-12 sm:col-span-6 min-h-[300px] md:col-span-4 lg:col-span-3" >
              <Blog  {...blog} />
            </div>
            )
          }
        </div>
      </section>

      {/* partner section */}
      <section className="container mx-auto section_Divider">
        <h2 className='title'>Trusted by the World most innovative teams</h2>
        <TrustedPartner brandImages={brandImages} />
      </section>

      {/* vision-mission */}
      <section className="container mx-auto section_Divider">
        <VisionMission />
      </section>

      {/* contact section */}
      <section className="container mx-auto section_Divider">
        <h2 className='title'>Contact Us</h2>
        <ContactForm />
      </section>
    </>
  );
}
