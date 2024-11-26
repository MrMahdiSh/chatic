import Button from "./button";

export default function HeroSection() {
  const buttonsRes = () => {
    alert("fsd");
  };
  return (
    <div className="w-full h-[80vh] flex flex-row">
      <div className="w-[50%] flex flex-col justify-evenly">
        <h1 className="font-bold text-[50px] leading-[150px]">
          با افزونه <span className="text-[#F5A623]">چتیک</span> دیگه{" "}
          <span className="text-[#F5A623]">مشتری</span> هات رو از دست نده
        </h1>

        <p>
          محصول ما به عنوان یک افزونه به سایت شما اضافه میشود و به شما در مدیریت
          پشتیبانی کاربران کمک میکند
        </p>

        <Button res={buttonsRes} text={"بزن بریم"} />
      </div>
      <div className="w-[50%] flex justify-center items-center">
        <iframe
          className="w-full h-full"
          src="https://lottie.host/embed/1080e5ee-194b-41fc-a48b-c9458d542c69/UGQdpkrUn2.lottie"
        ></iframe>
      </div>
    </div>
  );
}
