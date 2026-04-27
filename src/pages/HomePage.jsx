import { useRef } from 'react'
import {
  HomeAboutSection,
  HomeBenefitsSection,
  HomeBookingSection,
  HomeGallerySection,
  HomeHeroSection,
  HomeMetricsSection,
  HomePartnerSection,
  HomeTestimonialsSection,
  HomeTopServicesSection,
} from '../components/home/HomeSections'
import { useHomePageMotion } from '../hooks/useHomePageMotion'

export function HomePage() {
  const pageRef = useRef(null)

  useHomePageMotion(pageRef)

  return (
    <div ref={pageRef} className="min-h-screen bg-[#eae8e2] text-[#151912]">
      <main className="md:mx-auto mx-0 w-full ">
        <div className=" sm:px-5 sm:py-5 lg:px-8 lg:py-7 ">
          <HomeHeroSection />
        </div>
        <HomeAboutSection />
        <HomeTopServicesSection />
        <HomeMetricsSection />
        <HomeGallerySection />
        <HomePartnerSection />
        <HomeBenefitsSection />
        <HomeTestimonialsSection />
        {/* <HomeBookingSection /> */}
      </main>
    </div>
  );
}
