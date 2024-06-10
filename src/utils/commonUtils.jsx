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

export function shortenText(text, seeMore = false, length = 150) {
  if (text?.length > length) {
    return text.substring(0, length) + " ..." + (seeMore ? "See More" : "");
  }
  return text;
}

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

// Function to test string
export const isJSON = (text) => {
  if (typeof text !== "string") {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
};

export function getTextForRoleInfo(role) {
  if (role == null) return null;

  let permissions = [];
  if (role?.fullAccessPlanner == true) {
    permissions.push("fullAccessPlanner");
  } else if (role?.viewPlanner == true) {
    permissions.push("viewPlanner");
  }

  if (role?.editBrand == true) {
    permissions.push("editBrand");
  } else {
    permissions.push("viewBrand");
  }

  return permissions.length == 0
    ? null
    : permissions.map((permissionName, index) => {
        let response = {};
        switch (permissionName) {
          case "viewPlanner":
            response = {
              title: "View Planning Permissions",
              description: `You have access only to the view planner page. This access
          allows you to see the entire publishing calendar and information
          about planned posts. However, you cannot modify, create, or
          delete planned posts. You can, however, create, edit, and delete
          notes on posts.`,
            };
            break;
          case "fullAccessPlanner":
            response = {
              title: "Manage Planning Permissions",
              description: `
          Granting editing permission provides complete access to the planner, including the calendar, history, and autolists. Additionally, it enables the creation, modification, and publishing of posts, along with all associated functionalities.`,
            };
            break;
          case "editBrand":
            response = {
              title: `Brand Manage Permissions`,
              description: `Provide unrestricted access to brand configuration, encompassing the creation and administration of connections, as well as the management of users who possess brand access and their respective roles.`,
            };
            break;
          case "viewBrand":
            response = {
              title: `Brand View Permissions`,
              description: `Provide read-only access to the brand configuration, allowing you to view the creation and administration of connections, as well as the management of users who have access to the brand and their roles, without the ability to make any changes.`,
            };
            break;
          default:
            response = null;
        }
        return response;
      });
}
