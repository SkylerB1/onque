import React, { useState, useEffect } from "react";
import { SocialPlatforms } from "../../utils";
import { Typography, Button } from "@material-tailwind/react";
import PostsService from "../../services/PostsService";
import { useSelector } from "react-redux";
import { getSource, isContainImage, isContainVideo } from "../../utils";
import PostStatusIcon from "../common/PostStatusIcon";
import CreatePostModal from "../create-post-modal";
import dayjs from "dayjs";
import { isJSON } from "../../utils/commonUtils";
import useConnections from "../customHooks/useConnections";

const SocialPreviews = ({ connection, statusFilter, refreshPreview, setRefreshPreview }) => {
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id;

  const [selectedTypes, setSelectedTypes] = useState(['POST', 'REEL']); // Default both Post and Reel selected
  const [posts, setPosts] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedPlatformForModal, setSelectedPlatformForModal] = useState(null);

  const [caption, setCaption] = useState("");
  const [postData, setPostData] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(dayjs());
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setModal] = useState(false);
  // 🔥 state for grid pagination
  const [currentPage, setCurrentPage] = useState(0);

  // 🔥 state for per-post slider (tracks active file index per post)
  const [activeFileIndexes, setActiveFileIndexes] = useState({});

  const { connections } = useConnections();

  const handleModal = () => setModal(!openModal);

  const updatePostData = async (post) => {
    try {
      const {
        id,
        files: postFiles,
        platform,
        scheduledDate,
        status,
        socialPresets,
        text,
        thumbnailPresets,
        thumbnailFiles,
      } = post;

      if (!platform || platform.length === 0) return false;

      let postInsights = [];
      const result = await PostsService.getPostInsights(id);
      if (result.status === true) {
        postInsights = result.data.postInsights;
      }

      const filesArray =
        typeof postFiles === "string"
          ? JSON.parse(postFiles)
          : Array.isArray(postFiles)
          ? postFiles
          : [];

      const platformsArray = isJSON(platform)
        ? JSON.parse(platform)
        : Array.isArray(platform)
        ? platform
        : [platform];

      if (platformsArray.length > 0) {
        const matched =
          platformsArray.find((p) => p.platform === connection.platform) ||
          platformsArray[0];
        setSelectedPlatformForModal(matched);
      }

      const data = {
        id,
        _id: id,
        caption: text || "",
        text: text || "",
        files: filesArray,
        platforms: platformsArray,
        platform: platformsArray[0]?.platform || platformsArray[0] || "",
        status: status || "draft",
        scheduledDate: scheduledDate || new Date().toISOString(),
  socialPresets: socialPresets
    ? typeof socialPresets === "string"
      ? JSON.parse(socialPresets)
      : socialPresets
    : [],
        postInsights,
  thumbnailPresets: thumbnailPresets
    ? (typeof thumbnailPresets === "string"
        ? JSON.parse(thumbnailPresets)
        : thumbnailPresets)
    : null,
        thumbnailFiles: thumbnailFiles || [],
      };

      setPostData(data);
      setCaption(text || "");
      setFiles(filesArray);
      setScheduledDate(dayjs(scheduledDate || new Date()));
      setIsEdit(true);
      setModal(true);
    } catch (error) {
      console.error("Error in updatePostData:", error);
    }
  };

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (!connection) return;
      try {
        const response = await PostsService.getPostData(brandId);
        if (response?.status === 200 && Array.isArray(response?.data)) {
          const filtered = response.data
            .filter((item) => {
              let presets = [];
              try {
                presets = Array.isArray(item.socialPresets)
                  ? item.socialPresets
                  : JSON.parse(item.socialPresets || "[]");
              } catch (e) {
                presets = [];
              }
              return presets.some((p) => {
                const isMatchingPlatform = p.platform === connection.platform;
                let isMatchingType = false;
                // Check if the media type is in selectedTypes array
                if (selectedTypes.includes(p.mediaType)) {
                  isMatchingType = true;
                }

                return isMatchingPlatform && isMatchingType;
              });
            })
            .sort(
              (a, b) =>
                new Date(b.scheduledDate || b.createdAt) -
                new Date(a.scheduledDate || a.createdAt)
            );
          setPosts(filtered);
        } else {
          setPosts([]);
        }
      } catch (err) {
        setPosts([]);
      }
    };
    fetchPosts();
  }, [connection, selectedTypes, refreshPreview]);

  if (!connection || !SocialPlatforms[connection.platform]) {
    return <div>Select a social site to preview.</div>;
  }

  const { mediaOptions } = SocialPlatforms[connection.platform];

  const postsPerPage = 9;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const pagedPosts = posts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

  const chunked = [];
  for (let i = 0; i < pagedPosts.length; i += 3) {
    chunked.push(pagedPosts.slice(i, i + 3));
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {mediaOptions &&
          mediaOptions.map((option) => {
            const isSelected = selectedTypes.includes(option.label);
            return (
              <Button
                key={option.label}
                size="sm"
                variant={isSelected ? "filled" : "outlined"}
                color={isSelected ? "blue" : "gray"}
                className="flex items-center gap-2"
                onClick={() => {
                  if (isSelected) {
                    // Remove from selected types
                    setSelectedTypes(selectedTypes.filter(type => type !== option.label));
                  } else {
                    // Add to selected types
                    setSelectedTypes([...selectedTypes, option.label]);
                  }
                }}
              >
                {option.icon(18, 18)}
                <Typography className="text-xs">{option.label}</Typography>
              </Button>
            );
          })}
      </div>
      <div>
        <Typography variant="h6" className="mb-2">
          Posts ({posts.length})
        </Typography>

        {chunked.map((row, ridx) => (
          <div key={ridx} className="flex gap-3 mb-3">
            {row.map((post) => {
              let postFiles = [];
              try {
                postFiles = Array.isArray(post.files)
                  ? post.files
                  : JSON.parse(post.files || "[]");
              } catch (e) {
                postFiles = [];
              }

              const activeIndex = activeFileIndexes[post.id] || 0;
              const currentFile = postFiles[activeIndex] || null;

              return (
                <div key={post.id} className="flex flex-col items-center post-card-box">
                  {/* Post Card */}
                  <div
                    className="relative bg-white flex flex-col items-center w-full h-40 group cursor-pointer"
                    onClick={() => updatePostData(post)}
                  >
                    {/* Status Icon */}
                    <div className="absolute top-2 right-2 z-10">
                      <PostStatusIcon status={post.status} />
                    </div>

                    {/* Hover Overlay with Date */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center text-center justify-center rounded">
                      <span className="text-white text-sm font-medium">
                        {post.scheduledDate ? (
                          <>
                            {new Date(post.scheduledDate).toLocaleString()}
                            <div className="text-xs mt-1">
                              {Intl.DateTimeFormat().resolvedOptions().timeZone}
                            </div>
                          </>
                        ) : (
                          "No date"
                        )}
                      </span>
                    </div>

                    {/* Show single or first slider file */}
                    {currentFile ? (
                      isContainImage(currentFile) ? (
                        <img
                          src={getSource(currentFile)}
                          alt={post.text || "File"}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : isContainVideo(currentFile) ? (
                        <video
                          src={getSource(currentFile)}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : null
                    ) : (
                      <div className="text-xs text-gray-500">No media</div>
                    )}
                  </div>

                  {/* 🔥 Dots (below card, not inside card) */}
                  {postFiles.length > 1 && (
                    <div className="flex justify-center mt-1 gap-1">
                      {postFiles.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            setActiveFileIndexes((prev) => ({
                              ...prev,
                              [post.id]: idx,
                            }))
                          }
                          className={`w-2 h-2 rounded-full ${
                            idx === activeIndex
                              ? "bg-blue-500"
                              : "bg-blue-200"
                          } transition border-0 p-0`}
                          style={{ minWidth: "8px", minHeight: "8px" }}
                          aria-label={`Go to file ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* 🔥 Existing pagination dots (unchanged) */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 overflow-x-auto gap-1 max-w-xs mx-auto">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-2 h-2 rounded-full ${
                  idx === currentPage ? "bg-blue-500" : "bg-blue-200"
                } transition border-0 p-0`}
                style={{ minWidth: "8px", minHeight: "8px" }}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <CreatePostModal
        openModal={openModal}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setModal={setModal}
        handleModal={handleModal}
        postData={postData}
        clearPostData={() => setPostData(null)}
        files={files}
        setFiles={setFiles}
        videoDurations={[]}
        setVideoDurations={() => {}}
        setCaption={setCaption}
        scheduledDate={scheduledDate}
        setScheduledDate={setScheduledDate}
        caption={caption}
        connections={connections}
        selectedPlatformForModal={selectedPlatformForModal}
        setRefreshPreview={setRefreshPreview}
      />
    </div>
  );
};

export default SocialPreviews;
