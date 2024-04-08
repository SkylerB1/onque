import dayjs from "dayjs";

export const getDateFromUnix = (unixTimeSeconds, format = "DD/MM/YYYY") => {
  const date = dayjs.unix(unixTimeSeconds);
  const formattedDate = date.format(format);
  return formattedDate;
};
