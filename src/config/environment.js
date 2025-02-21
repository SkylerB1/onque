const environment = {
  isTwitterDisabled:
    (import.meta.env.VITE_IS_TWITTER_DISABLED || "true").toLowerCase() ===
    "true",
};

export default environment;
