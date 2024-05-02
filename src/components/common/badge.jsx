import React from 'react';
import { Badge, Button } from "@material-tailwind/react";
import { FaCheck } from "react-icons/fa6";
import { BsExclamation } from "react-icons/bs";

export function Badges({ platformIconsToShow, status }) {
  const statusClasses = {
    published: "bg-gradient-to-tr from-green-300 to-green-300 border-2 border-white shadow-lg",
    error: "bg-gradient-to-tr from-red-400 to-red-400 border-2 border-white shadow-lg"
  };

  return (
    <div className='flex flex-1 gap-2'>
      {platformIconsToShow.map((platformIconsToShow, index) =>
        <Badge
          color='green'
          content={status === "Published" ? <FaCheck className="h-3 w-3 text-white" strokeWidth={0.5} /> : <BsExclamation className="h-3 w-3 text-white" strokeWidth={0.5} />}
          className={statusClasses[status]}
          key={index}
        >
          <Button className='w-[2rem] px-2 py-2 bg-green-100'>{platformIconsToShow}</Button>
        </Badge>
      )}
    </div>
  )
}
