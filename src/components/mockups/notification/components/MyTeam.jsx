import { Typography } from "@material-tailwind/react";
import React from "react";

const MyTeam = () => {
  const tableHead = [
    "Email",
    "Type",
    "Team member",
    "Model and version",
    "Last access",
    "App version",
  ];
  return (
    <div>
      <div className="header">
        <Typography variant="h6" className="mb-4">
          My team Settings
        </Typography>
        <Typography variant="subtitle" className="my-4">
          Select how you want to receive notifications, you will only receive
          notifications in the method in which you select
        </Typography>
      </div>
      <div className="body mt-8 overflow-scroll">
        <table className="w-full min-w-max table-auto text-left ">
          <thead>
            <tr>
              {Array.isArray(tableHead) && tableHead.map((item, index) => (
                <th
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  key={index}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {item}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="h-20">
              <td
                colSpan={tableHead.length}
                className="text-center text-blue-gray"
              >
                "No data available"
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTeam;
