import React, { useState, useEffect } from 'react';
import styles from './video.module.css';
import translate from '../translate'; 

function useVideoData() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    async function fetchVideoUrl() {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_VIDEO,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch video data');
        }

        const data = await response.json();
        const { attributes: { video } } = data?.data;

        setVideoUrl(video);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching video data:', error);
        setError(translations.error); // Set error message from translations
        setIsLoading(false);
      }
    }

    fetchVideoUrl();
  }, []);

  return { videoUrl, isLoading, error };
}

function HomePage() {
  const { videoUrl, isLoading, error } = useVideoData();

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {isLoading ? (
        <p>{translate.loading}</p>
      ) : error ? (
        <p>{translate.videoerror}</p> 
      ) : (
        <div className={`${styles.VideoContainer}`}>
          <video  loop  autoPlay  muted  style={{ width: '100%', height: '490px', objectFit: 'cover' }}  onContextMenu={handleContextMenu}  controls>
              <source    src={videoUrl}    type="video/mp4"  />  
              {translate.videoTagNotSupported}</video>
        </div>
      )}
    </div>
  );
}

export default HomePage;
