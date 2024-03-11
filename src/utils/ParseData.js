export const ParseData = (data) => {
  if (typeof data === 'string') {
    const parsedData = JSON.parse(data);
    return parsedData;
  } else {
    return data;
  }
}
