;

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Link } from "react-router-dom";

const SettingNavbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const url = pathname + "?" + "tab" + "=" + tab;
  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <Link
              href="/setting/Settings?tab=account"
              className={
                url ===
                `/setting/Settings?tab=account`
                  ? "inline-block p-4 font-semibold text-orange-500 border-b-2 border-orange-500 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  : "inline-block p-4 font-normal border-b-2 border-transparent rounded-t-lg hover:text-orange-500 hover:border-orange-500 dark:hover:text-gray-300"
              }
            >
              Account
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/setting/Settings?tab=access"
              className={
                url ===
                `/setting/Settings?tab=access`
                  ? "inline-block p-4 font-semibold text-orange-500 border-b-2 border-orange-500 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  : "inline-block p-4 font-normal border-b-2 border-transparent rounded-t-lg hover:text-orange-500 hover:border-orange-500 dark:hover:text-gray-300"
              }
            >
              Access
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/setting/Settings?tab=price"
              className={
                url ===
                `/setting/Settings?tab=price`
                  ? "inline-block p-4 font-semibold text-orange-500 border-b-2 border-orange-500 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  : "inline-block p-4 font-normal border-b-2 border-transparent rounded-t-lg hover:text-orange-500 hover:border-orange-500 dark:hover:text-gray-300"
              }
            >
              Plans and billing
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingNavbar;