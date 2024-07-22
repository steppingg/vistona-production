import Image from "next/image";

const Header = () => {
  return (
    <header className="relative w-screen h-screen min-h-[841px] flex justify-center items-end px-4">
      <Image
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
        src="/static/images/subcription_header_bg.jpg"
        width={1920}
        height={1080}
        alt="Header background"
      />

      <div className="flex flex-col items-center text-center text-white gap-3 px-20 md:px-14 py-3">
        <h1 className="text-sm md:text-xl lg:text-2xl">
          Monthly subscription stone maintenance care package:
        </h1>
        <h1 className="uppercase text-4xl md:text-[64px] lg:text-8xl md:max-w-[716px] lg:max-w-[1074px] leading-tight pb-16 md:pb-56 lg:pb-40">
          Enhancing Durability and Beauty!
        </h1>

        <div className="visible md:invisible h-14 w-[2px] bg-[#878787] relative">
          <div className="h-1/3 w-[2px] bg-white absolute bottom-0 left-0" />
        </div>
      </div>
    </header>
  );
};

export default Header;
