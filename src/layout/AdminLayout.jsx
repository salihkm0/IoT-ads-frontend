import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { Container } from "../ui/Container";
import { BottomBar } from "../components/navbar/Bottombar";
import useVideoStore from "../store/videoStore"; // Import the video store
import useClientStore from "../store/clientStore"; // Import the client store
import useBrandStore from "../store/brandStore";
import { Sidebar } from "../components/sidebar/Sidebar";

const AdminLayout = () => {
  const { fetchVideos, videos } = useVideoStore();
  const { fetchAllRpis, rpis } = useClientStore();
  const { fetchBrands, brands } = useBrandStore();

  useEffect(() => {
    fetchVideos();
    fetchAllRpis();
    fetchBrands();
  }, [fetchVideos, fetchAllRpis, fetchBrands]);

  useEffect(() => {
    console.log("Videos fetched:", videos);
  }, [videos]);

  useEffect(() => {
    console.log("RPIs fetched:", rpis);
  }, [rpis]);

  useEffect(() => {
    console.log("brands fetched:", brands);
  }, [brands]);

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
        <Sidebar />
        <Container>
          <Outlet />
        </Container>
      <BottomBar />
    </>
  );
};

export default AdminLayout;
