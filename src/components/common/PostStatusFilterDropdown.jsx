import React, { useRef } from "react";
import PostStatusIcon from "./PostStatusIcon";
import { FiFilter } from "react-icons/fi";

const statusOptions = [
  { label: "All Posts", value: "all", icon: null },
  { label: "Drafts", value: "Drafts", icon: <PostStatusIcon status="Drafts" /> },
  { label: "Scheduled", value: "Scheduled", icon: <PostStatusIcon status="Scheduled" /> },
  { label: "Published", value: "Published", icon: <PostStatusIcon status="Published" /> },
  { label: "Failed to Post", value: "Failed to Post", icon: <PostStatusIcon status="Error" /> },
];

function PostStatusFilterDropdown({ onStatusChange }) {
  const [showCard, setShowCard] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  // Default: all unchecked
  const [selected, setSelected] = React.useState([]);
  const dropdownRef = useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCard(false);
        setShowMenu(false);
      }
    }
    if (showCard || showMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCard, showMenu]);

  const allStatusValues = statusOptions.filter(opt => opt.value !== "all").map(opt => opt.value);

  const handleOption = (value) => {
    if (value === "all") {
      if (selected.length === allStatusValues.length) {
        setSelected([]); // Uncheck all
        if (onStatusChange) onStatusChange([]);
      } else {
        setSelected(allStatusValues); // Check all except 'all'
        if (onStatusChange) onStatusChange(allStatusValues);
      }
    } else {
      let newSel = [];
      if (selected.includes(value)) {
        newSel = selected.filter((v) => v !== value);
      } else {
        newSel = [...selected, value];
      }
      // If all statuses are selected, treat as 'All Posts'
      if (newSel.length === allStatusValues.length) {
        setSelected(allStatusValues);
        if (onStatusChange) onStatusChange(allStatusValues);
      } else {
        setSelected(newSel);
        if (onStatusChange) onStatusChange(newSel);
      }
    }
  };


  // For display
  // For display: icons only
  let viewingIcons = [];
  if (selected.length === 0) {
    viewingIcons = [];
  } else if (selected.length === allStatusValues.length) {
    // All selected: show all status icons
    viewingIcons = statusOptions.filter(opt => opt.value !== "all").map(opt => opt.icon);
  } else {
    viewingIcons = statusOptions.filter(opt => selected.includes(opt.value)).map(opt => opt.icon);
  }

  return (
    <div className="w-full flex flex-col items-center py-2">
      <div className="relative w-full justify-start">
        {/* Step 1: Filters button */}
        <button
          className={`flex items-center gap-2 px-4 py-2 ml-5 bg-white border border-gray-300 rounded shadow-sm text-sm font-medium hover:bg-gray-100 focus:outline-none w-50 ${showCard ? "bg-blue-100" : ""}`}
          onClick={e => {
            e.stopPropagation();
            if (!showCard) setShowCard(true);
          }}
          aria-haspopup="true"
          aria-expanded={showCard}
          type="button"
        >
          <FiFilter className="w-4 h-4" />
          Filters
        </button>
        {/* Step 2: Card dropdown below button */}
        {showCard && (
          <div
            ref={dropdownRef}
            className="left-0 top-full mt-2 z-50 w-full bg-white rounded-xl shadow-xl border border-gray-200 py-2 px-0"
          >
            <>
              <button
                className="w-full px-4 py-3 flex items-center justify-between bg-white rounded-xl border-none outline-none hover:bg-gray-50"
                onClick={() => setShowMenu((v) => !v)}
                type="button"
              >
                <div className="flex items-center gap-2">
                {viewingIcons.length === 0 ? (
                  <span className="text-xs text-gray-400 italic">No filter</span>
                ) : (
                  viewingIcons.map((icon, idx) => (
                    <span key={idx}>{icon}</span>
                  ))
                )}
              </div>
                <span className={`ml-2 transition-transform ${showMenu ? "rotate-180" : "rotate-0"}`}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </button>
              {/* Step 3: Show menu only if showMenu is true */}
              {showMenu && (
                <div className="flex absolute flex-col bg-white z-50 p-2 border border-gray-200 rounded-xl w-full divide-y divide-gray-100 ">
                  {statusOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-50"
                    >
                      {opt.icon ? (
                        <span className="mr-2 flex-shrink-0">{opt.icon}</span>
                      ) : (
                        <span className="w-5 h-5 inline-block" />
                      )}
                      <span className="flex-1 text-sm text-gray-800">{opt.label}</span>
                      <input
                        type="checkbox"
                        checked={
                          opt.value === "all"
                            ? selected.length === allStatusValues.length
                            : selected.includes(opt.value)
                        }
                        onChange={() => handleOption(opt.value)}
                        className="form-checkbox h-4 w-4 text-blue-600 bg-blue-600 rounded"
                      />
                    </label>
                  ))}
                </div>
              )}
            </>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostStatusFilterDropdown;
