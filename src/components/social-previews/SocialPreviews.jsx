import React, { useState, useEffect } from "react";
import { SocialPlatforms } from "../../utils";
import { Typography, Button } from "@material-tailwind/react";
import PostsService from "../../services/PostsService";
import { useSelector } from "react-redux";
import Post from "../mockups/facebook/Post";
import { getSource, isContainImage, isContainVideo } from "../../utils";
import PostStatusIcon from "../common/PostStatusIcon";
import CreatePostModal from "../create-post-modal";
import dayjs from "dayjs";
import { isJSON } from "../../utils/commonUtils";

const SocialPreviews = ({ connection, ...props }) => {
  const user = useSelector((state) => state.user.value);
  const brandId = user?.brand?.id;
  const [selectedType, setSelectedType] = useState(null);
  const [posts, setPosts] = useState([]);
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState("");
  const [postData, setPostData] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(dayjs());
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setModal] = useState(false);
  
  const handleModal = () => setModal(!openModal);
  
  const updatePostData = async (post) => {
    try {
      const { id, files: postFiles, platform, scheduledDate, status, socialPresets, thumbnailPresets, thumbnailFiles, text } = post;

      if (!platform || platform.length === 0) return false;

      // Get the post insights data
      let result = await PostsService.getPostInsights(id);
      let postInsights = [];
      if (result.status === true) {
        postInsights = result.data.postInsights;
      }

      // Parse files if they're in string format
      const filesArray = typeof postFiles === 'string' ? JSON.parse(postFiles) : (Array.isArray(postFiles) ? postFiles : []);
      
      // Parse platforms if they're in string format
      let platformsArray = [];
      try {
        platformsArray = isJSON(platform) ? JSON.parse(platform) : (Array.isArray(platform) ? platform : [platform]);
        // Ensure platforms have the correct structure
        platformsArray = platformsArray.map(p => ({
          platform: typeof p === 'string' ? p : p.platform,
          ...(typeof p === 'object' && p !== null ? p : {})
        }));
      } catch (e) {
        console.error('Error parsing platforms:', e);
        platformsArray = [];
      }

      // Get the first platform for preview
      const firstPlatform = platformsArray[0]?.platform || platformsArray[0] || '';
      const platformType = firstPlatform?.includes('_') ? firstPlatform.split('_')[1] : firstPlatform;
      
      // Format the data for CreatePostModal
      const data = {
        _id: id,
        id: id,
        caption: text || '',
        text: text || '',
        files: filesArray,
        file: filesArray[0] || null,
        platforms: platformsArray,
        platform: firstPlatform,
        status: status || 'draft',
        socialPresets: socialPresets ? (typeof socialPresets === 'string' ? JSON.parse(socialPresets) : socialPresets) : [],
        postInsights: postInsights || [],
        thumbnailPresets: thumbnailPresets ? (typeof thumbnailPresets === 'string' ? JSON.parse(thumbnailPresets) : thumbnailPresets) : null,
        thumbnailFiles: thumbnailFiles || [],
        scheduledDate: scheduledDate || new Date().toISOString(),
        postdate: scheduledDate || new Date().toISOString(),
        // Set initial values for preview
        selectedPlatform: firstPlatform,
        mediaType: platformsArray[0]?.mediaType || 'POST',
        // Set up the preview data structure
        previewData: {
          [firstPlatform]: {
            mediaType: platformsArray[0]?.mediaType || 'POST',
            additionalPresets: {}
          }
        }
      };

      console.log('Formatted post data:', data);
      
      // Set the state
      setPostData(data);
      setCaption(text || '');
      setFiles(filesArray);
      setScheduledDate(dayjs(scheduledDate || new Date()));
      
      // Set the selectedPreview after a small delay to ensure the modal is mounted
      setTimeout(() => {
        if (platformsArray.length > 0) {
          // This will trigger the preview to update
          setSelectedPreview({
            platform: firstPlatform,
            platformType: platformType,
            mediaType: platformsArray[0]?.mediaType || 'POST'
          });
        }
      }, 100);
      
      setIsEdit(true);
      setModal(true);
      
    } catch (error) {
      console.error('Error in updatePostData:', error);
      // You might want to show an error toast here
    }
  };

  // Set default selectedType on mount or when platform changes
  useEffect(() => {
    if (!connection || !SocialPlatforms[connection.platform]) return;
    const { mediaOptions } = SocialPlatforms[connection.platform];
    if (mediaOptions && mediaOptions.length > 0) {
     
      // For Facebook, Instagram, or fallback: pick first
      setSelectedType(mediaOptions[0].label);
    }
  }, [connection]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!connection) return;
      // if(connection.platform === "Instagram") {
      //   const response = await PostsService.getInstagramFeed(brandId);
      //   console.log(response, "Instagram Feed Response");
      // }
      try {
        const response = await PostsService.getPostData(brandId);
        console.log(response, "Post Data Response");
        if (response?.status === 200 && Array.isArray(response?.data)) {
          console.log(selectedType, "Selected Type");
          console.log(connection, "Selected Connection");
          // Filter posts: only those with matching platform+type in socialPresets (not Instagram)
          const filtered = response.data.filter(item => {
            let presets = [];
            try {
              presets = Array.isArray(item.socialPresets) ? item.socialPresets : JSON.parse(item.socialPresets || '[]');
            } catch (e) { presets = []; }
              return presets.some(p => {
              const isMatchingPlatform = p.platform === connection.platform;
              const isMatchingType = (['Facebook_Page', 'Instagram'].includes(connection.platform) && selectedType === 'POST')
                ? ['POST', 'REEL'].includes(p.mediaType)
                : p.mediaType === selectedType;
              return isMatchingPlatform && isMatchingType;
            });
          }).sort((a, b) => new Date(b.scheduledDate || b.createdAt) - new Date(a.scheduledDate || a.createdAt));
          console.log(filtered, "Filtered Posts");
          setPosts(filtered);
        } else {
          setPosts([]);
        }
      } catch (err) {
        setPosts([]);
      }
    };
    fetchPosts();
  }, [connection, selectedType]);

  if (!connection || !SocialPlatforms[connection.platform]) {
    return <div>Select a social site to preview.</div>;
  }

  const { mediaOptions, coloredIcon } = SocialPlatforms[connection.platform];

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {mediaOptions &&
          mediaOptions.map((option) => (
            <Button
              key={option.label}
              size="sm"
              variant={selectedType === option.label ? "filled" : "outlined"}
              color="blue"
              className="flex items-center gap-2"
              onClick={() => setSelectedType(option.label)}
            >
              {option.icon(18, 18)}
              <Typography className="text-xs">{option.label}</Typography>
            </Button>
          ))}
      </div>

      <div>
        <Typography variant="h6" className="mb-2">
          Posts ({posts.length})
        </Typography>
        {/* Collect all files from filtered posts for the selected platform/type */}
        {(() => {
          let allFiles = [];
          posts.forEach(post => {
            let files = [];
            try {
              files = Array.isArray(post.files) ? post.files : JSON.parse(post.files || '[]');
            } catch (e) { files = []; }
            // Attach post info to each file for rendering
            files.forEach(file => allFiles.push({ ...file, post }));
          });

          // Filter files by statusFilter (from prop)
          let filteredFiles = allFiles;
          if (props.statusFilter && props.statusFilter.length > 0) {
            filteredFiles = allFiles.filter(file => props.statusFilter.includes(file.post.status));
          }

          // Pagination logic: 9 files per page
          const [currentPage, setCurrentPage] = React.useState(0);
          const filesPerPage = 9;
          const totalPages = Math.ceil(filteredFiles.length / filesPerPage);
          const pagedFiles = filteredFiles.slice(currentPage * filesPerPage, (currentPage + 1) * filesPerPage);

          // Chunk current page files into rows of 3
          const chunked = [];
          for (let i = 0; i < pagedFiles.length; i += 3) {
            chunked.push(pagedFiles.slice(i, i + 3));
          }

          return (
            <>
              {chunked.map((row, ridx) => (
                <div key={ridx} className="flex gap-3 mb-3">
                  {row.map((file, fidx) => (
                    <div 
                      key={file.post.id + '-' + fidx} 
                      className="relative bg-white flex flex-col items-center w-40 h-40 group cursor-pointer"
                      onClick={() => updatePostData(file.post)}
                    >
                      {/* Status Icon */}
                      <div className="absolute top-2 right-2 z-10">
                        <PostStatusIcon status={file.post.status} />
                      </div>
                      {/* Hover Overlay with Date */}
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center text-center justify-center rounded">
                        <span className="text-white text-sm font-medium">
                          {file.post.scheduledDate ? (
                            <>
                              {new Date(file.post.scheduledDate).toLocaleString()}
                              <div className="text-xs mt-1">
                                {Intl.DateTimeFormat().resolvedOptions().timeZone}
                              </div>
                            </>
                          ) : 'No date'}
                        </span>
                      </div>
                      {isContainImage(file) ? (
                        <img
                          src={getSource(file)}
                          alt={file.post.text || 'File'}
                          className="w-full h-40 object-cover rounded mb-2"
                        />
                      ) : isContainVideo(file) ? (
                        <video
                          src={getSource(file)}
                          className="w-full h-40 object-cover rounded mb-2"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}
              {/* Scrollable Dot Slider Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4 overflow-x-auto gap-1 max-w-xs mx-auto">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`w-2 h-2 rounded-full ${idx === currentPage ? 'bg-blue-500' : 'bg-blue-200'} transition border-0 p-0`}
                      style={{ minWidth: '8px', minHeight: '8px' }}
                      aria-label={`Go to page ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          );
        })()}
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
      />
    </div>
  );
};

export default SocialPreviews;
