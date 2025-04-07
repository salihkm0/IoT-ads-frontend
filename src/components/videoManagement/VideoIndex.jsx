import React, { useEffect, useState } from "react";

import { Heading } from "../../ui/Headding";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Import the upload icon
import { VideoControls } from "./VideoControls";
import { VideoTable } from "./VideoTable";
import { UploadForm } from "./UploadForm";
import useVideoStore from "../../store/videoStore";
import { Card } from "../../ui/Card";

export const VideoManagement = () => {
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [view, setView] = useState("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [loading, setLoading] = useState(false);

  const { videos, fetchVideos, getSortedVideos } = useVideoStore();

  // Access video store
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const filteredVideos = getSortedVideos(
    videos.filter((video) =>
      video.filename.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    sortOption
  );

  return (
    <>
      <div>
        <div className="flex justify-between items-center flex-wrap">
          <Heading>Ads Video Management</Heading>
          <button
            onClick={() => setIsUploadFormOpen(true)}
            className="flex items-center gap-1 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 py-1.5 px-3 text-center text-xs text-white shadow-md hover:from-blue-600 hover:to-indigo-700 transition mr-[10px] md:mr-[30px]"
          >
            <CloudUploadIcon className="text-white text-sm" />
            <span className="hidden sm:block">Upload</span>
          </button>
        </div>

        <VideoControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
          setView={setView}
          view={view}
        />
      </div>
      <div className="mt-5">
        {loading ? (
          <p>Loading...</p>
        ) : view === "card" ? (
          <div className="flex justify-around items-center flex-wrap gap-y-5">
            {filteredVideos.map((video) => (
              <Card key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <VideoTable videos={filteredVideos} />
        )}
      </div>

      {/* UploadForm Modal */}
      {isUploadFormOpen && (
        <UploadForm
          onClose={() => setIsUploadFormOpen(false)}
          fetchVideos={fetchVideos}
        />
      )}
    </>
  );
};
