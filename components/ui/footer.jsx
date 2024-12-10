import {
    FaCalendar,
    FaCheck,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaTelegram,
    FaFacebook,
    FaLinkedin,
    FaTwitter,
  } from "react-icons/fa";
  
export default function Footer() {
  const socialMedias = [
    {
      icon: <FaTelegram size="30px" color="#4747C2" />,
    },
    {
      icon: <FaFacebook size="30px" color="#4747C2" />,
    },
    {
      icon: <FaLinkedin size="30px" color="#4747C2" />,
    },
    {
      icon: <FaTwitter size="30px" color="#4747C2" />,
    },
  ];
  return (
    <div className="w-full mt-[10rem]">
      <div className="w-full h-[120px] bg-[#F2F2F2] relative">
        <div className="absolute h-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src="/images/logo/icon.png" width={100} alt="icon" />
          <p className="text-center">چتیک</p>
        </div>
      </div>
      <div className="w-full bg-[#F9F9F9] relative">
        <div className="w-full flex flex-row-reverse justify-around p-10">
          {/* Left Column for Licenses */}
          <div className="w-1/4 flex flex-col gap-5">
            <h1 className="text-center">نماد های اعتماد</h1>
            <div className="flex flex-row gap-5">
              <div className="bg-white w-1/2 h-[100px] rounded-lg"></div>
              <div className="bg-white w-1/2 h-[100px] rounded-lg"></div>
            </div>
          </div>

          {/* Gap */}
          <div className="w-1/12"></div>

          {/* Two Columns */}
          <div className="w-2/4 flex flex-row gap-20">
            {/* First Section */}
            <div>
              <h3 className="text-lg font-bold mb-4">
                همه روزه 24 ساعته همراه شما هستیم
              </h3>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-5">
                  <FaPhone className="text-black mr-2" />
                  021123456
                </li>
                <li className="flex items-center gap-5">
                  <FaEnvelope className="text-black mr-2" />
                  info@chatic.com
                </li>
                <li className="flex items-center gap-5">
                  <FaMapMarkerAlt className="text-black mr-2" />
                  تهران تهران
                </li>
              </ul>
            </div>

            {/* Second Section */}
            <div>
              <h3 className="text-lg font-bold mb-4">دسترسی سریع</h3>
              <ul className="flex flex-col gap-2">
                <li>امکانات</li>
                <li>قیمت</li>
                <li>مستندات</li>
                <li>راهنما</li>
              </ul>
            </div>
          </div>
        </div>
        {/* social media place */}
        <div className="w-full h-[50px]">
          <div className="h-full mx-auto p-5 flex flex-row justify-center items-center gap-5">
            {socialMedias.map((item, index) => (
              <div
                style={{ boxShadow: "rgb(0 0 0 / 20%) 0px 0px 30px" }}
                className="w-[60px] h-[60px] flex justify-center items-center bg-white rounded-lg"
                key={index}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-[#F2F2F2] h-10 relative flex justify-center items-center mt-10">
        <p className="text-center">تمامی حقوق مادی معنوی برای چتیک محفوظ است</p>
      </div>
    </div>
  );
}
