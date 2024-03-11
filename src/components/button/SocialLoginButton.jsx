import React from "react";

const SocialLoginButton = ({ label, icon, color }) => {
  return (
    <div
      className="flex w-full justify-between rounded-md"
      style={{ background: color }}
    >
      <span className="me-8 h-12 pl-2 py-3 text-base text-white">
        <p className="font-bold">{label}</p>
      </span>
      <span className="h-12 text-xl py-3 text-stone-600">
        {icon && <ListItemIcon className="font-bold">{icon}</ListItemIcon>}
      </span>
    </div>
  );
};

export default SocialLoginButton;
