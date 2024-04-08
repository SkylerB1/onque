import React from "react";
import {
  Accordion as CustomAccordion,
  AccordionHeader,
  AccordionBody,
  Typography,
} from "../../components/imports/imports";
import ExpandMoreIcon from "../../assets/expand-more.svg?react";

function Accordion({ children, title, icon, open, onClick, headerItems }) {
  return (
    <CustomAccordion
      open={open}
      className={`border border-blue-gray-100 rounded-lg mb-2 ${
        open === true && "accordian-container"
      }`}
      icon={<ExpandMoreIcon width={25} height={25} />}
    >
      <AccordionHeader
        onClick={onClick}
        className="border-b-0 flex justify-between items-center relative"
      >
        <div className="flex flex-row items-center">
          {icon}
          <Typography letterSpacing={"-0.5px"} className="ml-2">
            {title}
          </Typography>
        </div>
        {headerItems}
      </AccordionHeader>
      <AccordionBody className="px-4">{children}</AccordionBody>
    </CustomAccordion>
  );
}

export default Accordion;
