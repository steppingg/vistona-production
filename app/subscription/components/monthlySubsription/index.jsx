import Image from "next/image";

const includesArray = [
  {
    title: "Vessel Survey",
    text: "A comprehensive survey of the vessel to assess and catalogue all materials and range of grout tonality used on board.",
  },
  {
    title: "Personalised App",
    text: "Access to a secure, personalised iOS or Android app for each yacht, allowing the chief steward/stewardess to upload videos and images for ease of communicating area(s) of concern.",
  },
  {
    title: "Fast Expert Assistance",
    text: "Expert assistance with a guaranteed response to questions via our client portal within 12-24 hours.",
  },
  {
    title: "Rapid Response Team",
    text: "An on-board rapid response team available within 72 hours to address urgent issues and repair damage in between charters.",
  },
  {
    title: "Protective Treatment Applications",
    text: "We advise you avail of four protective seal treatment applications in a calendar year, and this protective measure can be tailored to align with your charter schedule.",
  },
  {
    title: "Be Ready For Next Season",
    text: "A comprehensive end-of-season service that includes touch-ups, repairs, polishing, sealing, and detailing of all marble works on the vessel, ensuring it’s ready for next season.",
  },
];

const notCoverArray = [
  { title: "Travel & transfers to the yachts location", text: "" },
  {
    title:
      "Accommodation for the team carrying out the works on board  (Local Airbnb will suffice)",
    text: "(If you would like Vistona to take care of the travel and accommodation arrangements, we will gladly do so, however a booking and administration surcharge of 20% on top of cost  will apply)",
  },
];

const MonthlySubscription = () => {
  return (
    <section className="bg-[#F9F9F9] py-52">
      <h1 className="max-w-[348px] md:max-w-[613px] lg:max-w-[817px] text-2xl md:text-4xl lg:text-5xl mx-auto uppercase text-center pb-12">
        Your monthly subscription includes the following services:
      </h1>
      <div className="max-w-[350px] md:max-w-[680px] lg:max-w-[920px] mx-auto flex flex-col gap-7">
        {includesArray.map(({ title, text }) => (
          <div className="flex gap-4" key={title}>
            <Image
              className="w-[20px] h-[14px]"
              src="/static/images/check_icon.svg"
              width={30}
              height={23}
              alt="Check icon"
            />

            <div className="flex flex-col gap-1">
              <h1 className="font-bold">{title}</h1>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="max-w-[274px] md:max-w-[584px] lg:max-w-[584px] text-2xl md:text-3xl mx-auto text-center pt-16 pb-12">
        Your monthly subscription does not cover:
      </h2>
      <div className="max-w-[350px] md:max-w-[680px] lg:max-w-[920px] mx-auto flex flex-col gap-7">
        {notCoverArray.map(({ title, text }) => (
          <div className="flex gap-4" key={title}>
            <Image
              className="w-[20px] h-[14px]"
              src="/static/images/close_black_icon.svg"
              width={30}
              height={23}
              alt="Check icon"
            />

            <div className="flex flex-col gap-1">
              <h1 className="font-bold">{title}</h1>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MonthlySubscription;
