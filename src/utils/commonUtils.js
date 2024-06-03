export const abbreviateString = (str) => {
  // Ensure the string is at least 12 characters long
  if (str.length <= 12) {
    return str; // Return the original string if it's too short to abbreviate
  }

  // Get the first 6 characters
  const firstPart = str.slice(0, 6);
  // Get the last 6 characters
  const lastPart = str.slice(-6);

  // Combine the parts with three dots in between
  return `${firstPart}...${lastPart}`;
};

// Social Plateform characters length
export const socialPlateFormCharactersLength = {
  twitter: 280,
  facebook: 16192,
  instagram: 2200,
  linkedIn: 3000,
  youtube: 5000,
  googleBusinessProfile: 1500,
  tiktok: 2000,
};

// Social Plateform characters length
export const socialPlateFormVideosLength = {
  twitter: 140,
  instagram: 900,
  tiktok: 600,
};
