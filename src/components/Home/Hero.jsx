export default function Hero() {
  return (
    <section className="w-full h-[90vh] flex flex-col lg:flex-row justify-center items-center px-6">
      <div className="w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center items-center">
        <h1 className="w-full text-center font-bold text-5xl lg:text-7xl">BOST PORTAL</h1>
        <p className="roboto-light text-xl lg:text-3xl">To manage all things Bost</p>
      </div>
      <div className="w-full lg:w-1/2  h-1/2 lg:h-full flex justify-center items-center">
        <img src="./home/Globe.svg" className="object-cover h-3/5 " />{" "}
      </div>
    </section>
  );
}
