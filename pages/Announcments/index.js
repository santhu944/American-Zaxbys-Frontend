import React, { useState, useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import './annoucment.module.css';
import styles from './annoucment.module.css';
import translate from '../translate';

const fetchData = async (setAnnouncementData, setIsLoading, setIsDismissed) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_HOMEPAGE_ANNOUNCEMENTS, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

  
    const announcements = data?.data || [];
    setAnnouncementData(announcements);
    setIsLoading(false);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    setIsLoading(false);
  }
};

const Announcement = () => {
  const [announcementData, setAnnouncementData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    fetchData(setAnnouncementData, setIsLoading, setIsDismissed);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <section className="bg-light pt-5 pb-5 shadow-sm">
      <div className="container">
        <div className="row pt-6">
          <div className="col-12 text-center">
          <p className={`${styles.smallFont} ${styles.menuTitle}`}>{translate('exclusiveRewards')}</p>
          <p className={`${styles.smallFontJustForYou} ${styles.menuTitleJustForYou}`}>{translate('justForYou')}</p>

          </div>
        </div>
        <div className="row">
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <>
              {announcementData.length === 0 && !isDismissed && (
              <Alert variant="info">
              {translate('noAnnouncements')}
              <button className="close" onClick={handleDismiss}>
                <span>&times;</span>
              </button>
            </Alert>
            
              )}

                {announcementData.map((announcement, index) => {
                const { Card } = announcement.attributes;

                return (
                  <div key={announcement.id} className="col-lg-4 mb-3 d-flex align-items-stretch">
                    <div className="card">
                      <img
                        src={Card}
                        alt={`Announcement ${index}`}
                        className="card-img-top"
                        height="500px"
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Announcement;
