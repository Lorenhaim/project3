import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GlobalStyle } from "./styles/global";
import { VideoCard } from "./styles/VideoCard";
import Modal from 'react-modal'
import {FaTimes} from 'react-icons/fa'
import { ContainerVideo } from "./styles/ContainerVideo";
import Loader from "react-loader-spinner";

interface Videos {
  id: string;
  featured_image_urls: any;
  title: any;
  video_cat: any;
  excerpt: any;
}


export function App() {
  const [items, setItems] = useState<Videos[]>([])
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('')

  useEffect(() => {
    axios.get<Videos[]>('https://panterastv.com/wp-json/wp/v2/video')
      .then( response => setItems(response.data))
  }, [])

  const fetchVideos = async () => {
    const res = await fetch(
      'https://panterastv.com/wp-json/wp/v2/video'
    );

    const data = await res.json();
    return data;
  }

  const fetchData = async () => {
    const videoFormServer = await fetchVideos();

    setItems([...items, ...videoFormServer]);
  }

  const handleOpenVideoModal = (id: string) => {
    setIsVideoModalOpen(true)
    const videoUrl = items.find(video => video.id === id)

    setSelectedVideoUrl("https://demo.aspanteras.tv/trailer/" + videoUrl!.excerpt.rendered.replace(/(<([^>]+)>)/ig, ''));
  }

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false)
  }

  return (
    <>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={true}
        loader={
          <Loader 
            type="Oval" 
            color="#d46113" 
            height={80} 
            width={80} 
          />
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        style={{
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          alignItems: 'center', 
          gap: '10px', 
          overflow: 'hidden', 
          justifyContent: "center", 
          padding: "1rem",
        }}
      >
        { items.map(item => {
          return (
            <VideoCard key={item.id} style={{height: "200px"}} onClick={() => handleOpenVideoModal(item.id)}>
              <img src={item.featured_image_urls.thumbnail[0]} alt="" />
            </VideoCard>
          )
        })}
      </InfiniteScroll>

      <Modal
      isOpen={isVideoModalOpen}
      onRequestClose={handleCloseVideoModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button
        type="button" 
        onClick={handleCloseVideoModal} 
        className="react-modal-close"
      >
        <FaTimes />
      </button>
      <ContainerVideo>
        <video src={selectedVideoUrl} controls></video>
      </ContainerVideo>

      </Modal>

      <GlobalStyle />
    </>
  );
}
