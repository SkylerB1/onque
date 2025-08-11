import React, { useState, useEffect } from "react";
import { SocialPlatforms } from "../../utils";
import { Typography, Button } from "@material-tailwind/react";
import PostsService from "../../services/PostsService";
import { useSelector } from "react-redux";
import Post from "../mockups/facebook/Post";
import { getSource, isContainImage, isContainVideo } from "../../utils";
import PostStatusIcon from "../common/PostStatusIcon"; // Use the new status icon component

const SocialPreviews = ({ connection, ...props }) => {
    const user = useSelector((state) => state.user.value);
    const brandId = user?.brand?.id;
  const [selectedType, setSelectedType] = useState(null);
  const [posts, setPosts] = useState([]);

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
          // Filter posts: only those with matching platform+type in socialPresets (not Instagram)
          const filtered = response.data.filter(item => {
            let presets = [];
            try {
              presets = Array.isArray(item.socialPresets) ? item.socialPresets : JSON.parse(item.socialPresets || '[]');
            } catch (e) { presets = []; }
            return presets.some(p => 
              p.platform === connection.platform &&
              p.mediaType === selectedType 
              // && p.platform !== 'Instagram'
            );
          }).sort((a, b) => new Date(b.createdAt || b.scheduledDate) - new Date(a.createdAt || a.scheduledDate));
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
                    <div key={file.post.id + '-' + fidx} className="relative bg-white flex flex-col items-center w-40 h-40">
                      {/* Status Icon */}
                      <div className="absolute top-2 right-2 z-10">
                        <PostStatusIcon status={file.post.status} />
                      </div>
                      {isContainImage(file) ? (
                        <img
                          src={getSource(file)}
                          alt={file.post.text || 'File'}
                          className="w-full h-40 object-cover rounded mb-2"
                        />
                      ) : isContainVideo(file) ? (
                        <video
                          controls
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
    </div>
  );
};

export default SocialPreviews;
