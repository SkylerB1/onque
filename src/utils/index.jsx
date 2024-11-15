import FlagIcon from "../assets/FlagIcon";
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
import {
  AdvancedPlanPng,
  EnterpisePlanPng,
  StarterPlanPng,
} from "../components/common/Images";
import { FBPost, FBReal, FBStory } from "../components/common/commonString";
import FacebookFilled from "../components/svg/FacebookFilled";
import Instagram from "../components/svg/Instagram";
import LinkedIn from "../components/svg/LinkedIn";
import Tiktok from "../components/svg/Tiktok";
import Twitter from "../components/svg/Twitter";
import YotubeShorts from "../components/svg/YotubeShorts";
import Youtube from "../components/svg/Youtube";
import YoutubeVideo from "../components/svg/YoutubeVideo";
import { useLocalStorage } from "./LocalStorage";
// import toast, { Toaster } from "react-hot-toast";
import { toast, Bounce } from "react-toastify";

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

export const ConnectUrlFn = (pageName, brandId) => {
  let ConnectUrl = {
    facebook_page: API_URL + `/auth/facebook/connection?brandId=${brandId}`,
    instagram_account:
      API_URL + `/auth/instagram/connection?brandId=${brandId}`,
    linkedin_page:
      API_URL + `/auth/linkedin/connection?type=page&brandId=${brandId}`,
    linkedin_profile:
      API_URL + `/auth/linkedin/connection?type=profile?brandId=${brandId}`,
    google_business:
      API_URL + `/auth/google_business/connect?brandId=${brandId}`,
  };
  return ConnectUrl[pageName];
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
    icon: (width = 10, height = 10) => (
      <GridSvg width={width} height={height} fill="#000000" />
    ),
    label: FBPost,
    description: "Standard Facebook publication",
  },
  {
    icon: (width = 14, height = 14) => (
      <ReelsSvg width={width} height={height} fill="#000000" />
    ),
    label: FBReal,
    description: "Automatic posting",
  },
  {
    icon: (width = 10, height = 10) => (
      <GridSvg width={width} height={height} fill="#000000" />
    ),
    label: FBStory,
    description: "Automatic posting",
  },
];

export const InstagramOptions = [
  {
    icon: (width = 10, height = 10) => (
      <GridSvg width={width} height={height} fill="#000000" />
    ),
    label: "POST",
    description:
      "Automatic posting of an image, a carousel or a video (as a Reel)",
  },
  {
    icon: (width = 14, height = 14) => (
      <ReelsSvg width={width} height={height} fill="#000000" />
    ),
    label: "REEL",
    description: "Automatic posting of a video",
  },
  {
    icon: (width = 10, height = 10) => (
      <StorySvg width={width} height={height} fill="#000000" />
    ),
    label: "STORY",
    description: "Automatic posting one or multiple stories",
  },
];

export const YoutubeOptions = [
  {
    icon: (width = 15, height = 15) => (
      <YoutubeVideo width={width} height={height} fill="#000000" />
    ),
    label: "VIDEO",
    description: "Standard YouTube video",
  },
  {
    icon: (width = 14, height = 14) => (
      <YotubeShorts width={width} height={height} fill="#000000" />
    ),
    label: "SHORTS",
    description: "Short-form, vertical video content",
  },
];

export const GoogleBusinessOptions = [
  {
    icon: (width = 10, height = 10) => (
      <GridSvg width={width} height={height} fill="#000000" />
    ),
    label: "POST",
    description: "For posting an update to your Google Business Profile",
  },
  // {
  //   icon: (width = 10, height = 10) => (
  //     <OfferSvg width={width} height={height} fill="#000000" />
  //   ),
  //   label: "OFFER",
  //   description: "For posting an offer to your Google Business Profile",
  // },
  // {
  //   icon: (width = 12, height = 12) => (
  //     <EventSvg width={width} height={height} fill="#000000" />
  //   ),
  //   label: "EVENT",
  //   description: "For posting an event to your Google Business Profile",
  // },
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
        <span
          style={{ top: "-5px", right: "-5px" }}
          className="absolute bg-gray-50 rounded-full p-[2px]"
        >
          <FlagIcon width={width / 2} height={height / 2} fill={"#000000"} />
        </span>
      </div>
    ),
    nonColoredIcon: (width, height) => (
      <div className="relative">
        <LinkedIn fill="#D3D3D3" width={width} height={height} />
        <span
          style={{ top: "-5px", right: "-5px" }}
          className="absolute bg-white rounded-full p-[2px]"
        >
          <FlagIcon width={width / 2} height={height / 2} fill={"#D3D3D3"} />
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
        <span
          style={{ top: "-5px", right: "-5px" }}
          className="absolute bg-gray-50 rounded-full p-[2px]"
        >
          <LinkedInUser
            width={width / 2}
            height={height / 2}
            fill={"#000000"}
          />
        </span>
      </div>
    ),
    nonColoredIcon: (width, height) => (
      <div className="relative">
        <LinkedIn fill="#D3D3D3" width={width} height={height} />
        <span
          style={{ top: "-5px", right: "-5px" }}
          className="absolute bg-white rounded-full p-[2px]"
        >
          <LinkedInUser
            width={width / 2}
            height={height / 2}
            fill={"#D3D3D3"}
          />
        </span>
      </div>
    ),
  },
  Google_Business: {
    mediaOptions: GoogleBusinessOptions,
    mediaType: "POST",
    tooltipSuffix: "",
    coloredIcon: (width, height) => (
      <GoogleBusiness fill="#0077B5" width={width} height={height} />
    ),
    nonColoredIcon: (width, height) => (
      <GoogleBusiness fill="#D3D3D3" width={width} height={height} />
    ),
  },
};

// Get the plans list
export const plansList = () => {
  return [
    {
      key: "starter",
      icon: StarterPlanPng,
      title: "Starter Plan",
      color: "#95C1D5",
      bgClass: "bg_starter_plan",
      monthly_price: 85,
      annualy_price: 850,
      savingWithAnnualPlan: 170,
      period: "Monthly",
      priceBody: [
        "Plan up to 2000 posts per month",
        "Up to 10 clients",
        "Management of all your clients’ social media accounts.",
        "Team member access",
        "Client review access",
        "OQ-Links",
        "AI Caption assistant",
      ],
      recommended: false,
      totalClients: 10,
    },
    {
      key: "advanced",
      icon: AdvancedPlanPng,
      title: "Advanced Plan",
      color: "#F9DC77",
      bgClass: "bg_advance_plan",
      monthly_price: 145,
      annualy_price: 1450,
      savingWithAnnualPlan: 290,
      period: "Monthly",
      priceBody: [
        "Plan up to 6000 posts per month",
        "Up to 30 clients",
        "Management of all your clients’ social media accounts.",
        "Team member access",
        "Client review access",
        "OQ-Links",
        "AI Caption assistant",
      ],
      recommended: true,
      totalClients: 30,
    },
    {
      key: "enterprise",
      icon: EnterpisePlanPng,
      title: "Enterprise Plan",
      color: "#ED94B6",
      bgClass: "bg_enterprise_plan",
      monthly_price: 225,
      annualy_price: 2250,
      savingWithAnnualPlan: 450,
      period: "Monthly",
      priceBody: [
        "Plan up to 12000 posts per month",
        "Up to 50 clients",
        "Management of all your clients’ social media accounts.",
        "Team member access",
        "Client review access",
        "OQ-Links",
        "AI Caption assistant",
      ],
      recommended: false,
      totalClients: 50,
    },
  ];
};

export const findPlan = (key) => {
  return plansList().find((item) => item.key == key);
};
export const lookupKeys = {
  starter: {
    monthly: "starter_plan_gbp",
    yearly: "starter_plan_gbp_yearly",
  },
  advanced: {
    monthly: "advanced_plan_gbp",
    yearly: "advanced_plan_gbp_yearly",
  },
  enterprise: {
    monthly: "enterprise_plan_gbp",
    yearly: "enterprise_plan_gbp_yearly",
  },
};

export const planLabel = {
  starter_plan_gbp: "Starter Plan - Monthly",
  starter_plan_gbp_yearly: "Starter Plan - Yearly",
  advanced_plan_gbp: "Advance Plan - Monthly",
  advanced_plan_gbp_yearly: "Advance Plan - Yearly",
  enterprise_plan_gbp: "Enterprise Plan - Monthly",
  enterprise_plan_gbp_yearly: "Enterprise Plan - Yearly",
};
export const paymentFailedStatuses = [
  "past_due",
  "unpaid",
  "incomplete",
  "incomplete_expired",
];
export const getCurrentPlan = (plan) => {
  let currentPlan, planDuration;
  switch (plan) {
    case "starter_plan_gbp":
      currentPlan = "starter";
      planDuration = "monthly";
      break;
    case "starter_plan_gbp_yearly":
      currentPlan = "starter";
      planDuration = "yearly";
      break;
    case "advanced_plan_gbp":
      currentPlan = "advanced";
      planDuration = "monthly";
      break;
    case "advanced_plan_gbp_yearly":
      currentPlan = "advanced";
      planDuration = "yearly";
      break;
    case "enterprise_plan_gbp":
      currentPlan = "enterprise";
      planDuration = "monthly";
      break;
    case "enterprise_plan_gbp_yearly":
      currentPlan = "enterprise";
      planDuration = "yearly";
      break;
    default:
      currentPlan = "";
      planDuration = "";
    // code block
  }
  return { currentPlan, planDuration };
};

export const getHighestPlanName = () => {
  return "enterprise_plan_gbp";
};
export const getCommaSeparatedNames = (arr, indentifier) => {
  const names = arr.map((item) => item[indentifier]);

  if (arr.length <= 5) {
    return names.join(", ");
  } else {
    const firstFiveNames = names.slice(0, 5);
    const remainingCount = names.length - 5;

    return `${firstFiveNames.join(", ")} and ${remainingCount} more`;
  }
};

export const validateEmail = (email) => {
  let isValid = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return isValid;
};

export function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function toastrSuccess(message) {
  toast.dismiss();

  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
}
export function toastrError(message) {
  toast.dismiss();

  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
}

export function toFixedNumber(value) {
  if (!value) return "";
  return value.toFixed(2);
}
