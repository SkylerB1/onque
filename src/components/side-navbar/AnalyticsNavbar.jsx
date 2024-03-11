;

import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { usePathname, useSearchParams } from "next/navigation";
import { HiOutlineDocumentReport, HiHashtag, HiOutlineClipboardList } from "react-icons/hi";
import { GiSettingsKnobs } from "react-icons/gi";
import Twitter from "../../assets/twitter.svg?react";
import YoutubeFilled from "../../assets/youtube-filled.svg?react";
import Instagram from "../../assets/instagram.svg?react";
import TikTok from "../../assets/tiktok.svg?react";
import LinkedIn from "../../assets/linkedin.svg?react";
import GoogleBusiness from "../../assets/google-business.svg?react";
import FacebookFilled from "../../assets/facebook-filled.svg?react";

const AnalyticsNavbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const url = pathname + "?" + "tab" + "=" + tab;

  return (
    <Card className="fixed w-64 top-20 left-0 h-[calc(100vh-2rem)]  max-w-[20rem] shadow-xl shadow-blue-gray-900/5">
      <List>
        <ListItem
          className={
            pathname === "/analytics/social-graph-data/summary"
              ? "text-black bg-blue-gray-100 rounded-md shadow-sm hover:bg-gray-200 hover:text-black"
              : ""
          }
        >
          <ListItemPrefix>
            <HiOutlineClipboardList className="h-5 w-5" />
          </ListItemPrefix>
          <Link className="w-full" href={"/analytics/social-graph-data/summary"}>Summary</Link>
        </ListItem>
        <ListItem
          className={
            url ===
            `/analytics/social-graph-data/social-connect-data?tab=facebook`
              ? "text-black bg-blue-gray-100 rounded-md shadow-sm hover:bg-gray-200 hover:text-black"
              : ""
          }
        >
          <ListItemPrefix>
            <FacebookFilled fill="#5686F6" width={18} height={18} />
          </ListItemPrefix>
          <Link className="w-full"
            href={
              "/analytics/social-graph-data/social-connect-data?tab=facebook"
            }
          >
            Facebook
          </Link>
        </ListItem>
        <ListItem
          className={
            url ===
            "/analytics/social-graph-data/social-connect-data?tab=instagram"
              ? "text-black bg-blue-gray-100 rounded-md shadow-sm hover:bg-gray-200 hover:text-black"
              : ""
          }
        >
          <ListItemPrefix>
          <Instagram fill="#E34A5F"  width={18} height={18} />
          </ListItemPrefix>
          <Link className="w-full"
            href={
              "/analytics/social-graph-data/social-connect-data?tab=instagram"
            }
          >
            Instagram
          </Link>
        </ListItem>
        <ListItem
          className={
            url ===
            "/analytics/social-graph-data/social-connect-data?tab=twitter"
              ? "text-black bg-blue-gray-100 rounded-md shadow-sm hover:bg-gray-200 hover:text-black"
              : ""
          }
        >
          <ListItemPrefix>
          <Twitter  width={18} height={18} />
          </ListItemPrefix>
          <Link className="w-full"
            href={
              "/analytics/social-graph-data/social-connect-data?tab=twitter"
            }
          >
            Twitter
          </Link>
        </ListItem>
        <ListItem
          url={
            pathname ===
            "/analytics/social-graph-data/social-connect-data?tab=  "
              ? "text-black bg-blue-gray-100 rounded-md shadow-sm hover:bg-gray-200 hover:text-black0"
              : ""
          }
        >
          <ListItemPrefix>
          <TikTok  width={18} height={18} />
          </ListItemPrefix>
          <Link className="w-full"
            href={"/analytics/social-graph-data/social-connect-data?tab=tiktok"}
          >
            TikTok
          </Link>
        </ListItem>
        <ListItem
          url={
            pathname ===
            "/analytics/social-graph-data/social-connect-data?tab=linkedin"
              ? "text-black bg-blue-gray-100 rounded-md shadow-sm hover:bg-gray-200 hover:text-black0"
              : ""
          }
        >
          <ListItemPrefix>
          <LinkedIn fill="#5686F6" width={18} height={18} />
          </ListItemPrefix>
          <Link className="w-full"
            href={
              "/analytics/social-graph-data/social-connect-data?tab=linkedin"
            }
          >
            Linkedin
          </Link>
        </ListItem>
        <ListItem
          className={
            url ===
            "/analytics/social-graph-data/social-connect-data?tab=google-business"
              ? "text-black bg-blue-gray-100 rounded-md shadow-sm hover:bg-gray-200 hover:text-black"
              : ""
          }
        >
          <ListItemPrefix>
          <GoogleBusiness fill="#5686F6" width={18} height={18} />
          </ListItemPrefix>
          <Link className="w-full"
            href={
              "/analytics/social-graph-data/social-connect-data?tab=google-business"
            }
          >
            Google Business Profile
          </Link>
        </ListItem>
        <ListItem
          className={
            url ===
            "/analytics/social-graph-data/social-connect-data?tab=youtube"
              ? "text-black bg-blue-gray-100 rounded-md shadow-sm hover:bg-gray-200 hover:text-black"
              : ""
          }
        >
          <ListItemPrefix>
          <YoutubeFilled fill="red" width={18} height={18} />
          </ListItemPrefix>
          <Link className="w-full"
            href={
              "/analytics/social-graph-data/social-connect-data?tab=youtube"
            }
          >
            YouTube
          </Link>
        </ListItem>
        {/* <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link className="w-full" href={"/analytics/social-graph-data/social-connect-data?tab="}>
            Facebook Ads
          </Link>
        </ListItem> */}
        {/* <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link className="w-full" href={"/analytics/social-graph-data/social-connect-data?tab="}>
            Google Ads
          </Link>
        </ListItem> */}
        {/* <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link className="w-full" href={"/analytics/social-graph-data/social-connect-data?tab="}>
            TikTok Ads
          </Link>
        </ListItem> */}
        <hr className="h-px bg-gray-500 border-0 dark:bg-gray-700"></hr>
        <ListItem
          className={` ${
            pathname === "#"
              ? "text-black bg-blue-gray-100 rounded-md shadow-sm hover:bg-gray-200 hover:text-black"
              : ""
          }`}
        >
          <ListItemPrefix>
            <HiOutlineDocumentReport className="h-5 w-5" />
          </ListItemPrefix>
          Reports
        </ListItem>
        <ListItem
          className={
            pathname === "#"
              ? "text-black bg-blue-gray-100 rounded-md shadow-sm hover:bg-gray-200 hover:text-black"
              : ""
          }
        >
          <ListItemPrefix>
            <HiHashtag className="h-5 w-5" />
          </ListItemPrefix>
          Hashtag Tracker
        </ListItem>
        <ListItem
          className={
            pathname === "#"
              ? "text-black bg-blue-gray-100 rounded-md shadow-sm hover:bg-gray-200 hover:text-black"
              : ""
          }
        >
          <ListItemPrefix>
            <GiSettingsKnobs className="h-5 w-5" />
          </ListItemPrefix>
          Client settings
        </ListItem>
      </List>
    </Card>
  );
};

export default AnalyticsNavbar;
