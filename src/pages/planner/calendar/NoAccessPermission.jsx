import { Card } from "@material-tailwind/react";
import React from "react";
import { Planner } from "../../../components/common/Images";

const NoAccessPermission = ({ title, body="Sorry, you don't have enough permissions to access this brand", image = Planner }) => {
  return (
    <Card>
      <div className="p-8">
        <div className="m-headline font-light text-3xl mb-8 leading-snug">
          {title}
        </div>
        <div className="text-lg leading-snug break-normal">
          {body}
        </div>
      </div>
      <div>
        <img src={image} width="100%" height="auto" />
      </div>
    </Card>
  );
};

export default NoAccessPermission;
