import FacebookFilled from "../svg/FacebookFilled";
import Instagram from "../svg/Instagram";
import Youtube from "../svg/Youtube";
import Twitter from "../svg/Twitter";
import Tiktok from "../svg/Tiktok";
import LinkedIn from "../svg/LinkedIn";
import GoogleBusiness from "../svg/GoogleBusiness";
import GoogleBusinessApi from "../SocialMediaConnection/GoogleBusinessApi";
import LinkedInConnectPage from "../SocialMediaConnection/LinkedInConnectPage";
import LinkedInConnectProfile from "../SocialMediaConnection/LinkedinConnectProfile";
import TwitterApi from "../SocialMediaConnection/TwitterApi";
import { YouTubeApi } from "../SocialMediaConnection/YouTubeApi";
import FacebookApi from "../SocialMediaConnection/FacebookApi";
import TiktokPersonal from "../SocialMediaConnection/TiktokPersonal";
import TiktokBusiness from "../SocialMediaConnection/TiktokBusiness";
import ConnectInstagram from "../SocialMediaConnection/ConnectInstagram";

export const socialMediaList = [
  {
    icon: (color) => <Twitter fill={color ?? "#828487"} width={24} height={24} />,
    title: "Twitter",
    label: "CONNECT ACCOUNT",
    platform: "Twitter",
    key: "twitter",
    color: "#0F141A",
    component: TwitterApi,
    isConnected: "false",
    screenName: "",
  },
  {
    icon: (color) => <FacebookFilled fill={color ?? "#828487"} width={24} height={24} />,
    title: "Facebook Page",
    label: "CONNECT PAGE",
    platform: "Facebook_Page",
    key: "facebook_page",
    color: "#31A2F2",
    component: FacebookApi,
    isConnected: "false",
    screenName: "",
  },
  {
    icon: (color) => <Instagram fill={color ?? "#828487"} width={24} height={24} />,
    title: "Instagram",
    label: "CONNECT PROFESSIONAL ACCOUNT",
    platform: "Instagram",
    key: "instagram_account",
    color: "#E64B5F",
    component: ConnectInstagram,
    isConnected: "false",
    screenName: "",
  },
  {
    icon: (color) => <Youtube fill={color ?? "#828487"} width={24} height={24} />,
    title: "YouTube",
    label: "CONNECT ACCOUNT",
    key: "youtube",
    platform: "YouTube",
    color: "#EA462F",
    component: YouTubeApi,
    isConnected: "false",
    screenName: "",
  },
  {
    icon: (color) => <Tiktok fill={color ?? "#828487"} width={24} height={24} />,
    title: "TikTok Personal",
    label: "CONNECT PERSONAL ACCOUNT",
    platform: "TikTok_Personal",
    key: "tiktok_personal",
    color: "#010101",
    component: TiktokPersonal,
    isConnected: "false",
    screenName: "",
  },
  {
    icon: (color) => <Tiktok fill={color ?? "#828487"} width={24} height={24} />,
    title: "TikTok Business",
    label: "CONNECT BUSINESS ACCOUNT",
    platform: "TikTok_Business",
    key: "tiktok_business",
    color: "#010101",
    component: TiktokBusiness,
    isConnected: "false",
    screenName: "",
  },
  {
    icon: (color) => <LinkedIn fill={color ?? "#828487"} width={24} height={24} />,
    title: "LinkedIn",
    label: "CONNECT PROFILE",
    platform: "LinkedIn",
    key: "linkedin_profile",
    color: "#1F73B1",
    component: LinkedInConnectProfile,
    isConnected: "false",
    screenName: "",
  },
  {
    icon: (color) => <LinkedIn fill={color ?? "#828487"} width={24} height={24} />,
    title: "LinkedIn Page",
    label: "CONNECT PAGE",
    platform: "LinkedIn_Page",
    key: "linkedin_page",
    color: "#1F73B1",
    component: LinkedInConnectPage,
    isConnected: "false",
    screenName: "",
  },
  {
    icon: (color) => <GoogleBusiness fill={color ?? "#828487"} width={24} height={24} />,
    title: "Google Business",
    label: "CONNECT ACCOUNT",
    platform: "Google_Business",
    key: "google_business",
    color: "#3189F9",
    component: GoogleBusinessApi,
    isConnected: "false",
    screenName: "",
  },
];