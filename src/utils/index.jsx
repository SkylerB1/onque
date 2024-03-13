import GoogleBusiness from "../assets/GoogleBusiness";
import InstagramFilled from "../assets/InstagramFilled";
import LinkedInUser from "../assets/LinkedInUser";
import {
  EventSvg,
  GridSvg,
  OfferSvg,
  ReelsSvg,
  StorySvg,
} from "../components/common/Images";
import FacebookFilled from "../components/svg/FacebookFilled";
import Instagram from "../components/svg/Instagram";
import LinkedIn from "../components/svg/LinkedIn";
import Tiktok from "../components/svg/Tiktok";
import Twitter from "../components/svg/Twitter";
import YotubeShorts from "../components/svg/YotubeShorts";
import Youtube from "../components/svg/Youtube";
import YoutubeVideo from "../components/svg/YoutubeVideo";
import { useLocalStorage } from "./LocalStorage";

export const API_URL = import.meta.env.VITE_API_URL;
export const POST_IMG_BASE_PATH = import.meta.env.VITE_POST_IMG_BASE_PATH;

export const user = useLocalStorage("user", "get");
export const brandId = user?.brand?.id;
export const ConnectUrl = {
  facebook_page: API_URL + `/auth/facebook/connection?brandId=${brandId}`,
  instagram_account: API_URL + `/auth/instagram/connection?brandId=${brandId}`,
  linkedin_page:
    API_URL + `/auth/linkedin/connection?type=page&brandId=${brandId}`,
  linkedin_profile:
    API_URL + `/auth/linkedin/connection?type=profile?brandId=${brandId}`,
  google_business: API_URL + `/auth/google_business/connect?brandId=${brandId}`,
};

export const getSource = (file) => {
  if (file) {
    if (file instanceof File || file instanceof Blob) {
      return URL.createObjectURL(file);
    } else {
      return POST_IMG_BASE_PATH + file?.filename;
    }
  } else {
    return "";
  }
};

export const isContainVideo = (file) =>
  file?.type?.includes("video") || file?.mimetype?.includes("video");
export const isContainImage = (file) =>
  file?.type?.includes("image") || file?.mimetype?.includes("image");

export const getFirstLetter = (str) => (str ? str[0] : "Y");

const FacebookOptions = [
  {
    icon: <GridSvg width={10} height={10} fill="#000000" />,
    label: "POST",
  },
  {
    icon: <ReelsSvg width={14} height={14} fill="#000000" />,
    label: "REEL",
  },
];

export const InstagramOptions = [
  {
    icon: <GridSvg width={10} height={10} fill="#000000" />,
    label: "POST",
  },
  {
    icon: <ReelsSvg width={14} height={14} fill="#000000" />,
    label: "REEL",
  },
  {
    icon: <StorySvg width={10} height={10} fill="#000000" />,
    label: "STORY",
  },
];

export const YoutubeOptions = [
  {
    icon: <YoutubeVideo width={15} height={15} fill="#000000" />,
    label: "VIDEO",
  },
  {
    icon: <YotubeShorts width={14} height={14} fill="#000000" />,
    label: "SHORTS",
  },
];

export const GoogleBusinessOptions = [
  {
    icon: <GridSvg width={10} height={10} fill="#000000" />,
    label: "POST",
  },
  {
    icon: <OfferSvg width={10} height={10} fill="#000000" />,
    label: "OFFER",
    selected: true,
  },
  {
    icon: <EventSvg width={12} height={12} fill="#000000" />,
    label: "EVENT",
  },
];

export const SocialPlatforms = {
  Facebook_Page: {
    mediaOptions: FacebookOptions,
    mediaType: "POST",
    tooltipSuffix: " - Page",
    coloredIcon: (width, height) => (
      <FacebookFilled fill="#0095f6" width={width} height={height} />
    ),
    nonColoredIcon: (width, height) => (
      <FacebookFilled fill="#D3D3D3" width={width} height={height} />
    ),
  },
  Instagram: {
    mediaOptions: InstagramOptions,
    mediaType: "POST",
    tooltipSuffix: "",
    coloredIcon: (width, height) => <Instagram width={width} height={height} />,
    nonColoredIcon: (width, height) => (
      <InstagramFilled fill="#D3D3D3" width={width} height={height} />
    ),
  },
  YouTube: {
    mediaOptions: YoutubeOptions,
    mediaType: "VIDEO",
    tooltipSuffix: "",
    coloredIcon: (width, height) => (
      <Youtube width={width} height={height} fill="#FF0000" />
    ),
    nonColoredIcon: (width, height) => (
      <Youtube fill="#D3D3D3" width={width} height={height} />
    ),
  },
  Twitter: {
    mediaOptions: [],
    mediaType: "POST",
    tooltipSuffix: "",
    coloredIcon: (width, height) => (
      <Twitter fill="#000000" width={width} height={height} />
    ),
    nonColoredIcon: (width, height) => (
      <Twitter fill="#D3D3D3" width={width} height={height} />
    ),
  },
  TikTok_Personal: {
    mediaOptions: [],
    mediaType: "VIDEO",
    tooltipSuffix: " - Personal",
    coloredIcon: (width, height) => <Tiktok width={width} height={height} />,
    nonColoredIcon: (width, height) => (
      <Tiktok fill="#D3D3D3" width={width} height={height} />
    ),
  },
  TikTok_Business: {
    mediaOptions: [],
    mediaType: "VIDEO",
    tooltipSuffix: " - Business",
    coloredIcon: (width, height) => <Tiktok width={width} height={height} />,
    nonColoredIcon: (width, height) => (
      <Tiktok fill="#D3D3D3" width={width} height={height} />
    ),
  },
  LinkedIn_Page: {
    mediaOptions: [],
    mediaType: "POST",
    tooltipSuffix: " - Page",
    coloredIcon: (width, height) => (
      <div className="relative">
        <LinkedIn fill="#0077B5" width={width} height={height} />
        <span className="absolute -top-[6px] -right-[6px] bg-gray-50 rounded-full p-[2px]">
          <LinkedInUser width={12} height={12} fill={"#000000"} />
        </span>
      </div>
    ),
    nonColoredIcon: (width, height) => (
      <div className="relative">
        <LinkedIn fill="#D3D3D3" width={width} height={height} />
        <span className="absolute -top-[6px] -right-[6px] bg-white rounded-full p-[2px]">
          <LinkedInUser width={10} height={10} fill={"#D3D3D3"} />
        </span>
      </div>
    ),
  },
  LinkedIn: {
    mediaOptions: [],
    mediaType: "POST",
    tooltipSuffix: " - Profile",
    coloredIcon: (width, height) => (
      <div className="relative">
        <LinkedIn fill="#0077B5" width={width} height={height} />
        <span className="absolute -top-[6px] -right-[6px] bg-gray-50 rounded-full p-[2px]">
          <LinkedInUser width={12} height={12} fill={"#000000"} />
        </span>
      </div>
    ),
    nonColoredIcon: (width, height) => (
      <div className="relative">
        <LinkedIn fill="#D3D3D3" width={width} height={height} />
        <span className="absolute -top-[6px] -right-[6px] bg-white rounded-full p-[2px]">
          <LinkedInUser width={10} height={10} fill={"#D3D3D3"} />
        </span>
      </div>
    ),
  },
  Google_Business: {
    mediaOptions: GoogleBusinessOptions,
    mediaType: "POST",
    coloredIcon: (width, height) => (
      <GoogleBusiness fill="#0077B5" width={width} height={height} />
    ),
    nonColoredIcon: (width, height) => (
      <GoogleBusiness fill="#D3D3D3" width={width} height={height} />
    ),
  },
};
