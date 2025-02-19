import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Account from "./Account";
import Access from "./Access";
import Price from "./Price";

const SettingOption = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <div className="">
      <div className="grid flex-1 flex-row rounded-lg mt-12">
        {tab === "account" ? (
          <Account tab={tab} />
        ) : tab === "access" ? (
          <Access tab={tab} />
        ) : tab === "price" ? (
          <Price tab={tab} />
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
};

export default SettingOption;
