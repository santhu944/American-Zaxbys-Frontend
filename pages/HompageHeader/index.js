import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from './homepage.module.css';
import translations from '../translate'; 

function fetchHeaderData(setHeaderData, setError, setIsLoading) {
  const apiUrl = process.env.NEXT_PUBLIC_HOMEPAGE_Header;
  const authToken = process.env.NEXT_PUBLIC_TOKEN;

  fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      if (responseData.data && responseData.data.length > 0) {
        setHeaderData(responseData.data);
      }
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
}

function HomePageHeader() {
  const [headerData, setHeaderData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHeaderData(setHeaderData, setError, setIsLoading);
  }, []);

  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${styles.HomePageNavBar}`} fixed="top">
      <Container>
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center">
            <h1  className={`${styles.Logo} m-0`} >LOGO</h1>
          </div>
          <div className={`text-center flex-grow-1 ${styles['custom-container']}`}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {isLoading ? (
                  <p>{translations.loading}</p>
                ) : error ? (
                  <p>{`${translations.error} ${error}`}</p>
                ) : (
                  headerData.map((item, index) => {
                    const { attributes: { HeaderName } } = item;
                    return (
                      <Nav.Link key={item.id} href="#" className={`me-${index + 1}`}>
                        <p className={`${styles.smallFont} ${styles.menuTitle}`}>{HeaderName}</p>
                      </Nav.Link>
                    );
                  })
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default HomePageHeader;
