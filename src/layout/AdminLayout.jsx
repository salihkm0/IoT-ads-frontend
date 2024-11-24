import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { Container } from "../ui/Container";
import { BottomBar } from "../components/navbar/Bottombar";
import useVideoStore from "../store/videoStore"; // Import the video store
import useClientStore from "../store/clientStore"; // Import the client store

const AdminLayout = () => {
  const { fetchVideos, videos } = useVideoStore();
  const { fetchAllRpis, rpis } = useClientStore();

  useEffect(() => {
    fetchVideos();
    fetchAllRpis();
  }, [fetchVideos, fetchAllRpis]);

  useEffect(() => {
    console.log("Videos fetched:", videos);
  }, [videos]);

  useEffect(() => {
    console.log("RPIs fetched:", rpis);
  }, [rpis]);

  if (videos.length === 0 && rpis.length === 0) {
    return (
      <div>
        <Navbar />
        <Container>
          <h1>Loading...</h1>
        </Container>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
      <BottomBar />
    </>
  );
};

export default AdminLayout;
