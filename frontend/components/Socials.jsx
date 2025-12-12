import { BiLogoFacebook, BiLogoInstagram } from "react-icons/bi";

const socials = [
  {
    icon: <BiLogoFacebook />,
    path: "",
  },
  {
    icon: <BiLogoInstagram />,
    path: "",
  },
];

const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <div key={index} className={iconStyles}>
            {item.icon}
          </div>
        );
      })}
    </div>
  );
};

export default Socials;
