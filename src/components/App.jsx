import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getSearchItem } from '../services/getSearchItem';

import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';

import { Container } from './App.styled';

export default function App() {
  const [searchItem, setSearchItem] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState({ url: '', alt: '' });

  const abortController = useRef();

  useEffect(() => {
    const showNotification = data => {
      if (data.hits.length === 0) {
        toast.error(`There is't result with search name ${searchName}`);
      }
    };

    if (searchName !== '') {
      try {
        setIsLoading(true);
        getSearchItem(searchName, page, abortController).then(data => {
          showNotification(data);
          setSearchItem(prevSearchItem => [...prevSearchItem, ...data.hits]);
          setIsLoading(false);
          setTotalPages(Math.floor(data.totalHits / 12));
        });
      } catch (error) {
        toast.error('Oops, something went wrong');
        console.log(error);
      }
    }
  }, [searchName, page]);

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
    setPage(1);
    setSearchItem([]);
  };

  const handleLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = image => {
    const { largeImageURL, tags } = image;
    setIsLoading(true);
    setShowModal(true);
    setModalImage({
      url: largeImageURL,
      alt: tags,
    });
  };

  const handleModalClose = () => {
    setIsLoading(false);
    setShowModal(false);
  };

  const handleModalImageLoading = () => {
    setIsLoading(false);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchItem={searchItem} onClick={handleImageClick} />
      {isLoading && <Loader />}

      {searchItem.length > 0 && !isLoading && page <= totalPages && (
        <Button text="Load more" onClick={handleLoad}></Button>
      )}

      {showModal && (
        <Modal
          image={modalImage}
          onClose={handleModalClose}
          onLoad={handleModalImageLoading}
        />
      )}
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
