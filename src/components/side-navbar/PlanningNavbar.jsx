import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CiCircleList, CiCalendarDate } from "react-icons/ci";

export default function PlanningNavbar() {
  const { pathname } = useLocation();
  return (
    <Card className="fixed xl:top-[90px] left-0 h-[calc(100vh-2rem)] w-full max-w-[5rem] p-4  shadow-blue-gray-100/5 bg-[#F1F2F4] md:top-[74px] lg:top-[88px]">
      <List className="bg-[#F1F2F4] xl:block md:hidden">
        <Link
          to="/planner/calendar"
          className="flex items-center font-medium text-lg"
        >
          <ListItem
            className={`w-[200px] ${
              pathname === "/planner/calendar"
                ? "text-black bg-[#E5E7EB] w-[200px] rounded-md shadow-sm hover:bg-[#E5E7EB] hover:text-black"
                : "text-black"
            }`}
          >
            <ListItemPrefix>
              <CiCalendarDate className="h-5 w-5" />
            </ListItemPrefix>
            Calendar
          </ListItem>
        </Link>
        {/* Commenting the Planning History Link */}
        {/* <Link
          to="/planner/history"
          className={`flex items-center font-medium text-lg `}
        >
          <ListItem
            className={`w-[200px] ${
              pathname === "/planner/history"
                ? "text-black bg-[#E5E7EB] w-[200px] rounded-md shadow-sm hover:bg-[#E5E7EB] hover:text-black"
                : "text-black"
            }`}
          >
            <ListItemPrefix>
              <CiCircleList className="h-5 w-5" />
            </ListItemPrefix>
            History
          </ListItem>
        </Link> */}
      </List>
      <List className="bg-[#F1F2F4] xl:hidden md:block md:w-6 md:min-w-full ">
        <Link
          to="/planner/calendar"
          className="flex items-center font-medium text-lg w-12"
        >
          <ListItem
            className={` ${
              pathname === "/planner/calendar"
                ? "text-black bg-[#E5E7EB] rounded-md shadow-sm hover:bg-[#E5E7EB] hover:text-black w-12"
                : ""
            }`}
          >
            <ListItemPrefix>
              <CiCalendarDate className="h-5 w-5" />
            </ListItemPrefix>
          </ListItem>
        </Link>
        <Link
          to="/planner/history"
          className={`flex items-center font-medium text-lg w-12 `}
        >
          <ListItem
            className={` ${
              pathname === "/planner/history"
                ? "text-black bg-[#E5E7EB]  rounded-md shadow-sm hover:bg-[#E5E7EB] hover:text-black w-12"
                : ""
            }`}
          >
            <ListItemPrefix>
              <CiCircleList className="h-5 w-5" />
            </ListItemPrefix>
          </ListItem>
        </Link>
      </List>
    </Card>
  );
}
