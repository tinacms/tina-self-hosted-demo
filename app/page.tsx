import { client } from "../tina/__generated__/databaseClient";
import Blog from "../components/features/blog";
import ContactForm from "../components/features/contact-form";
import Product from "../components/features/product";
import HeroBannerText from "./_components/hero-banner-text";
import TrustedPartner from "./_components/trusted-partner";
import Image from "next/image";
import Mission from "./_components/mission";
import Vision from "./_components/vision";
import Technology from "./_components/technology";

export default async function Home() {

  const homePageContent = await client.queries.home({ relativePath: 'home.md' })
  const { heroBanner, mission, partners, technology, vision } = homePageContent.data.home

  const partnersList = partners?.partnersInfo?.map((partner) => ({
    partnerName: partner?.partnerName || '',
    partnerImage: partner?.partnerImage || ''
  })) || []
  //products
  const productsConnection = await client.queries.productConnection({ first: 8 })
  const products = productsConnection.data.productConnection.edges;

  //blogs
  const blogsConnection = await client.queries.blogConnection({ first: 3 })
  const blogs = blogsConnection.data.blogConnection.edges || []
  return (
    <>
      {/* hero section */}
      <section className="w-full relative  md:min-h-[776px]">
        <Image src='https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2023/12/Nikon-Metrology-Innovative-measurement-solutions-for-your-shop-floor.jpg' alt="RTech-banner" width={1024} height={1636} className="md:hidden" />
        <video autoPlay loop muted playsInline preload="auto" className="w-full hidden md:block min-h-[776px] object-cover"><source type="video/mp4" src="https://industry.nikon.com/en-us/wp-content/uploads/sites/13/2023/03/1131_NI_APDIS-website-header_19_CBR-2MB.mp4" /></video>
        <HeroBannerText description={heroBanner?.heroBannerDescription || ''} title={heroBanner?.heroBannerTitle || ''} />
      </section>


      {/* partner section */}
      <section className="container mx-auto py-12">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          {partners?.title}
        </h2>
        <TrustedPartner partners={partnersList} />

      </section>

      {/* products section */}
      <section className="container mx-auto border-t py-20 relative">
        <div aria-hidden="true" className="absolute -top-10 right-0 -z-10 transform-gpu blur-3xl">
          <div
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
            className="aspect-[1404/400] w-[80.75rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"
          />
        </div>
        <div className="flex flex-col text-center items-center">
          <h2 className="text-lg font-semibold leading-7 text-brandSecondary">Our Products</h2>
          <h2 className="title max-w-3xl tracking-tight leading-tight">Cutting-edge, Reliable, Affordable.</h2>
          <p className="max-w-3xl text-lg text-gray-600">
            Experience the future of Medical Device Manufacturing
          </p>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-5">
          {
            products?.map((product) => product?.node && <div key={product.node?.uniqueId} className="col-span-12 md:col-span-6">
              <Product  {...product.node} />
            </div>
            )
          }
        </div>
      </section>

      {/* blog section */}
      <div className="bg-[#FEF8EA] ">
        <section className="container mx-auto py-20">
          <h2 className="underline underline-offset-8 decoration-[#f7a81b] title">Latest News</h2>

          <div className="grid grid-cols-12 gap-6">
            {
              blogs.map((blog) => {
                const blogNode = blog?.node
                if (!blogNode || !blogNode.uniqueId) return null;
                return <div key={blogNode.uniqueId} className="col-span-12 md:col-span-6 lg:col-span-4" >
                  <Blog
                    date={blogNode.date || blogNode.createdAt || null}
                    uniqueId={blogNode.uniqueId}
                    imageUrl={blogNode.overviewImage || ''}
                    title={blogNode.title || ''}
                  />
                </div>
              }
              )
            }
          </div>
        </section>
      </div>

      {/* vision-mission-technology */}
      <div className="bg-gray-50">
        <section className="container mx-auto py-20">
          <div className="max-w-2xl lg:mx-0">
            <h2 className="title underline underline-offset-8 decoration-brandSecondary">Our values</h2>
            <p className="mt-6 text-lg ml-4leading-8 text-gray-600">
              At RTECH, Our team of experts has a wealth of experience in the industry and is dedicated to delivering the best possible solutions to our clients.

              With over 13 years of expertise in the medical device manufacturing sector. Founded in 2021 with a mission to provide the highest quality of automated equipment, our team is passionate about building reliable, safe, and efficient automated equipment.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-600 md:grid-cols-2 lg:grid-cols-3 lg:mx-0 lg:max-w-none lg:gap-x-16">
            <Mission description={mission?.missionDescription} title={mission?.missionTitle || ''} />
            <Vision description={vision?.visionDescription} title={vision?.visionTitle || ''} />
            <Technology description={technology?.technologyDescription} title={technology?.technologyTitle || ''} />
          </div>
        </section>
      </div>

      {/* contact section */}
      <div className="bg-slate-50 border-t">
        <section className="container mx-auto py-20">
          <ContactForm />
        </section>
      </div>
    </>
  );
}
