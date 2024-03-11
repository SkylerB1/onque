function EventDateFormat(publishDate = "") {
  let dateStr = "";
  var months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (publishDate) {
    var date = new Date(publishDate);
    var minute = publishDate.getUTCMinutes();
    var hour = publishDate.getUTCHours();

    dateStr =
      months[date.getMonth()] +
      " " +
      date.getDate() +
      " " +
      date.getFullYear() +
      "  " +
      hour +
      ":" +
      minute;
  }

  return dateStr;
}
export default EventDateFormat;
