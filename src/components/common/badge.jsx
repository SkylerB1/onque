import React from "react";
import { Badge, Button } from "@material-tailwind/react";
import { FaCheck } from "react-icons/fa6";
import { BsExclamation } from "react-icons/bs";

import { MdOutlineDrafts } from "react-icons/md";
import { MdDrafts } from "react-icons/md";
import { postStatuses } from "./commonString";

export function Badges({ platformIconsToShow, status }) {
  // const statusClasses = {
  //   published:
  //     "bg-gradient-to-tr from-green-300 to-green-300 border-2 border-white shadow-lg",
  //   saveasdraft:
  //     "bg-gradient-to-tr from-gray-600 to-gray-600 border-2 border-white shadow-lg",
  //   error:
  //     "bg-gradient-to-tr from-red-400 to-red-400 border-2 border-white shadow-lg",
  // };
  let statusClasses = [];
  let buttonBgClasses = [];
  statusClasses[postStatuses.published] =
    "bg-gradient-to-tr from-green-300 to-green-300 border-2 border-white shadow-lg";
  statusClasses[postStatuses.saveAsDraft] =
    "bg-gradient-to-tr from-gray-600 to-gray-600 border-2 border-white shadow-lg";
  statusClasses[postStatuses.ongoing] =
    "bg-gradient-to-tr from-slate-600 to-slate-600 border-2 border-white shadow-lg";
  statusClasses[postStatuses.error] =
    "bg-gradient-to-tr from-red-400 to-red-400 border-2 border-white shadow-lg";

  buttonBgClasses[postStatuses.published] = "bg-green-200";
  buttonBgClasses[postStatuses.saveAsDraft] = "bg-gray-200";
  buttonBgClasses[postStatuses.ongoing] = "bg-slate-200";
  buttonBgClasses[postStatuses.error] = "bg-red-200";

  return (
    <div className="flex flex-1 gap-2">
      {platformIconsToShow.map((platformIconsToShow, index) => (
        <Badge
          color="green"
          content={
            status === postStatuses.published ? (
              <FaCheck className="h-3 w-3 text-white" strokeWidth={0.5} />
            ) : status === postStatuses.error ? (
              <BsExclamation className="h-3 w-3 text-white" strokeWidth={0.5} />
            ) : (
              <MdOutlineDrafts
                className="h-3 w-3 text-white"
                strokeWidth={0.5}
              />
            )
          }
          className={statusClasses[status]}
          key={index}
        >
          <Button className={`w-[2rem] px-2 py-2 ${buttonBgClasses[status]}`}>
            {platformIconsToShow}
          </Button>
        </Badge>
      ))}
    </div>
  );
}
