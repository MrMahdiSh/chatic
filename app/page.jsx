"use client";

import { useState, useEffect } from "react";
import React from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "utils/firebase/firebase";
import useFcmToken from "utils/firebase/hooks/useFcmToken";
import Header from "@/components/ui/header";
import HeroSection from "@/components/ui/HeroSection";
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
import Button from "@/components/ui/button";

export default function Page() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  // Use the token as needed
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isAlreadyInstalled, setIsAlreadyInstalled] = useState(false); // State to track installation status

  // Handle the install prompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Check if the app is already installed in the useEffect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isInstalled = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      setIsAlreadyInstalled(isInstalled);
    }
  }, []);

  // Request to install the app when the user clicks on the button
  const RequestFunc = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Clear the deferred prompt
        setIsInstallable(false);
      });
    }
  };

  // Firebase messaging for foreground notifications
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);

  const AIPart = () => {
    return (
      <div className="relative w-full h-[300px] mt-20">
        <div className="bg-[#5746AF] w-40 h-40 rounded-full blur-3xl left-20 absolute"></div>
        <div className="bg-[#5746AF] w-40 h-40 rounded-full blur-3xl right-20 bottom-0 absolute"></div>
        <div className="w-[70%] h-[80%] p-10 mx-auto rounded-xl border-gray-400 border-[1.5px] backdrop-blur-lg">
          <div className="w-[50%] flex flex-col h-full justify-around">
            <h1 className="text-xl font-bold">بگذارید هوش مصنوعی پاسخ دهد</h1>
            <p className="text-xl">
              در چتیک میتوانید اجازه دهید هوش مصنوعی پاسخگوی مشتریان باشد
            </p>
          </div>
          <img
            width={"40%"}
            className="absolute bottom-0 left-0"
            src="images/robo.png"
            alt="robo"
          />
        </div>
      </div>
    );
  };

  const Features = () => {
    const myFeatures = [0, 1, 2];
    return (
      <div className="w-full mt-20 mb-20">
        <h1 className="font-bold text-2xl text-center">امکانات</h1>
        <div className="w-full flex flex-row justify-between mt-20 mb-20">
          {myFeatures.map((name, index) => (
            <div
              key={index}
              style={{ boxShadow: "rgb(0 0 0 / 20%) 0px 0px 30px" }}
              className="w-[30%] h-[250px] rounded-3xl relative p-5 flex justify-start flex-col gap-5"
            >
              <div className="bg-[#7134fe5b] rounded-full w-[80px] h-[80px] h-min-[80px] w-min-[80px] flex justify-center items-center">
                <FaCalendar size={40} color="#6F34FE" />
              </div>

              <p className="font-bold">اتصال به تلگرام</p>

              <h1>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون{" "}
              </h1>

              <div className="absolute bg-[#02292B] w-[60%] h-[10px] bottom-[-10px] right-[50%] translate-x-[50%] rounded-br-lg rounded-bl-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PricingTable = () => {
    const prices = [0, 1, 2];

    const items = [
      [
        "لورم اسپوریم",
        "لورم اسپوریم",
        "لورم اسپوریم",
        "لورم اسپوریم",
        "لورم اسپوریم",
        "لورم اسپوریم",
      ],
      [
        "لورم اسپوریم",
        "لورم اسپوریم",
        "لورم اسپوریم",
        "لورم اسپوریم",
        "لورم اسپوریم",
        "لورم اسپوریم",
      ],
      [
        "لورم اسپوریم",
        "لورم اسپوریم",
        "لورم اسپوریم",
        "لورم اسپوریم",
        "لورم اسپوریم",
        "لورم اسپوریم",
      ],
    ];

    return (
      <div className="w-full mt-[10rem]">
        <h1 className="font-bold text-2xl text-center">جدول قیمت ها</h1>
        <div className="w-full flex flex-row justify-between items-center">
          {prices.map((item, index) => (
            <div
              className="w-[25%] h-[600px] mt-20 rounded-xl flex flex-col justify-between items-start p-10"
              style={{ boxShadow: "rgb(0 0 0 / 20%) 0px 0px 30px" }}
              key={index}
            >
              <h1 className="font-bold">200/000 هزارتومان ماهانه</h1>

              <h1 className="font-bold">بهترین</h1>

              <p className="text-gray-400">
                لورم اسپوریم لورم اسپوریم لورم اسپوریم لورم اسپوریم
              </p>

              {items[index].map((item, index) => {
                return (
                  <div key={index} className="flex felx-row gap-5">
                    <div className="flex items-center justify-center w-5 h-5 bg-[#5243c262] rounded-full mx-auto mb-2">
                      <FaCheck className="text-[#5243C2] text-sm" />
                    </div>
                    <p>{item} </p>
                  </div>
                );
              })}

              <button className="bg-[#02292B] w-full h-[50px] text-white rounded-full">
                انتخاب
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="bg-[#02292B] w-[300px] h-[50px] text-white rounded-lg mt-20 mx-auto">
            اطلاعات بیشتر
          </button>
        </div>
      </div>
    );
  };

  const CallUs = () => {
    return (
      <div className="w-full mt-[10rem]">
        <h1 className="font-bold text-2xl text-right">با ما در تماس باشید:</h1>

        <div className="mt-20 flex flex-row">
          <div className="w-1/2">
            <div
              style={{ boxShadow: "rgb(0 0 0 / 20%) 0px 0px 30px" }}
              className="w-full h-[500px] rounded-3xl flex flex-col justify-around items-center p-10"
            >
              {/* inputs here */}
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                className="bg-[#ECECEC] rounded-lg p-2 w-full h-16"
              />
              <input
                type="text"
                placeholder="شماره"
                className="bg-[#ECECEC] rounded-lg p-2 w-full h-16"
              />

              <textarea
                placeholder="متن پیام"
                className="bg-[#ECECEC] rounded-lg p-2 text-right align-top w-full h-32 max-h-32 min-h-32"
              />

              <button className="bg-[#02292B] w-full h-[70px] text-white rounded-lg">
                انتخاب
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <img src="/images/guyWorking.png" alt="guyWorking" />
          </div>
        </div>
      </div>
    );
  };

  const Footer = () => {
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
          <p className="text-center">
            تمامی حقوق مادی معنوی برای چتیک محفوظ است
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="px-16">
        <Header />
        <HeroSection />
        <AIPart />
        <Features />
        <PricingTable />
        <CallUs />
      </div>
      <Footer />
    </div>
  );
}
