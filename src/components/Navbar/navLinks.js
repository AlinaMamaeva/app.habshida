//icons
import PostIcon from "../../assets/PenIcon.svg";
import SettingIcon from "../../assets/settingsIcon.svg";
import ProfileIcon from "../../assets/profileIcon.svg";

export const navLinks = (currentUser) => [

    {
          title: "Home",
          url: "/",
          isVisible: true,
        },
        {
          title: "Sign In",
          url: "/sign-in",
          isVisible: !currentUser,
        },
        {
          title: "Sign Up",
          url: "/sign-out",
          isVisible: !currentUser,
        },
    
        {
          title: "New Post",
          url: "/new-post",
          icon: PostIcon,
          isVisible: currentUser,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: SettingIcon,
          isVisible: currentUser,
        },
        {
          title: "Profile",
          url: "/profile",
          icon: ProfileIcon,
          isVisible: currentUser,
        },
      ];
