import BookNow from "@/shared/custom-components/BookNow";
import { Hero } from "@/shared/custom-components/Hero";
import OurProcess from "@/shared/custom-components/OurProcess";
import WhyChooseWebvirtus from "@/shared/custom-components/WhyChooseWebvirtus";

export default function Home() {
  return (
    <div className="w-screen overflow-hidden">
      <Hero />
      <WhyChooseWebvirtus />
      <OurProcess />
      <BookNow />
    </div>
  );
}
