import AccountBTN from "./AccountBTN";

export default function Header() {
  const menuItems = [
    { name: "امکانات", url: "/features" },
    { name: "قیمت", url: "/prices" },
    { name: "مستندات", url: "/docs" },
    { name: "راهنما", url: "/faq" },
  ];
  return (
    <>
      <div className="w-100 flex flex-row justify-between mt-10">
        <div>
          <img className="h-[50px]" src="images/logo/logo.png" alt="logo" />
        </div>
        <div className="flex flex-row gap-10 justify-start w-[50%] items-center">
          {menuItems.map((item, index) => (
            <a key={index} href={item.url}>
              {item.name}
            </a>
          ))}
        </div>
        <div>
          <AccountBTN />
        </div>
      </div>
    </>
  );
}
