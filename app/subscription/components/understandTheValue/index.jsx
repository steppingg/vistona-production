import Image from "next/image";

const UnderstandTheValue = () => {
  return (
    <section className="relative lg:grid grid-cols-6 gap-2">
      <Image
        className="w-full object-cover object-right h-full hidden lg:block"
        src="/static/images/yacht_sketch_desktop_left.png"
        width={1920}
        height={1080}
        alt="Yacht sketch"
      />

      <div className="flex col-span-4 flex-col gap-5 md:gap-7 items-center justify-center text-center pt-24 px-8">
        <h1 className="uppercase text-2xl md:text-4xl lg:text-5xl w-[193px] md:w-[467px] lg:w-[622px]">
          we understand the value
        </h1>

        <p className="text-sm md:text-base md:w-[603px] lg:w-[717px]">
          Maintaining natural stone on a super yacht requires diligent and
          specialised care to preserve its beauty and integrity. Given the high
          standards required for charter guests, regular maintenance is
          essential to ensure that stone surfaces retain their original lustre,
          thus enhancing the yacht&apos;s overall appearance. 
        </p>

        <p className="text-sm md:text-base md:w-[603px] lg:w-[717px]">
          To address these challenges, Vistona has developed an all-inclusive
          monthly subscription care package. This approach ensures you no longer
          have to limit your attention to these matters at the end of each
          season or on an annual basis.
        </p>
      </div>

      <Image
        className="w-full object-cover object-left h-full hidden lg:block -z-10"
        src="/static/images/yacht_sketch_desktop_right.jpg"
        width={1920}
        height={1080}
        alt="Yacht sketch"
      />

      <Image
        className="w-full block md:hidden pt-5"
        src="/static/images/yacht_sketch_mobile.png"
        width={1920}
        height={1080}
        alt="Yacht sketch"
      />

      <Image
        className="w-full hidden md:block lg:hidden pt-20"
        src="/static/images/yacht_sketch_tablet.png"
        width={1920}
        height={1080}
        alt="Yacht sketch"
      />
    </section>
  );
};

export default UnderstandTheValue;
