import React from "react";
import { FiEdit } from "react-icons/fi"; // Draft (rectangle with pen)
import { AiOutlineClockCircle, AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai"; // Scheduled, Published, Failed

// Usage: <PostStatusIcon status="Drafts" />
const statusIconMap = {
  Drafts: {
    icon: <FiEdit color="#6c757d" size={22} />, // Gray pen
    bg: "#f8f9fa", // Light gray rectangle
    shape: "rect"
  },
  Scheduled: {
    icon: <AiOutlineClockCircle color="#007bff" size={22} />, // Blue clock
    bg: "#e9f5ff", // Light blue circle
    shape: "circle"
  },
  Published: {
    icon: <AiOutlineCheckCircle color="#28a745" size={22} />, // Green tick
    bg: "#e6f9ec", // Light green
    shape: "none"
  },
  Error: {
    icon: <AiOutlineWarning color="#dc3545" size={22} />, // Red triangle
    bg: "#fdecea", // Light red
    shape: "none"
  }
};

const PostStatusIcon = ({ status }) => {
  const conf = statusIconMap[status] || statusIconMap["Drafts"];
  if (conf.shape === "rect") {
    return (
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 22,
        background: conf.bg,
        borderRadius: 4,
        border: "1px solid #dee2e6"
      }}>
        {conf.icon}
      </span>
    );
  }
  if (conf.shape === "circle") {
    return (
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        background: conf.bg,
        borderRadius: "50%",
        border: "1px solid #b6d4fe"
      }}>
        {conf.icon}
      </span>
    );
  }
  // No special shape (just icon with colored background)
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: conf.bg,
      borderRadius: 4,
      padding: 2
    }}>
      {conf.icon}
    </span>
  );
};

export default PostStatusIcon;
