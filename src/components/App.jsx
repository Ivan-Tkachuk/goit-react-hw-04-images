import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getSearchItem } from '../services/getSearchItem';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import { Container } from './App.styled';

class App extends React.Component {
  state = {
    searchName: '',
    searchItem: [],
    error: null,
    status: 'idle',
    page: 1,
    totalPages: 0,
    showModal: false,
    modalImage: {
      url: '',
      alt: '',
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, searchItem, searchName } = this.state;
    const prevQueryValue = prevState.searchName;
    const currentQueryValue = searchName;

    if (prevQueryValue !== currentQueryValue || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });

        getSearchItem(searchName, page).then(data => {
          this.showNotification(data);

          this.setState({
            searchItem: [...searchItem, ...data.hits],
            status: 'resolved',
            totalPages: Math.floor(data.totalHits / 12),
          });
        });
      } catch (error) {
        this.setState({ error: true });
        toast.error('Oops, something went wrong');
        console.log(error);
      }
    }
  }

  showNotification = data => {
    if (data.hits.length === 0) {
      toast.error(
        `There is't result with search name ${this.state.searchName}`
      );
    }
  };

  handleFormSubmit = searchName => {
    this.setState({
      searchName: searchName,
      searchItem: [],
      page: 1,
    });
  };

  handleLoad = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleImageClick = image => {
    const { largeImageURL, tags } = image;

    this.setState({
      status: 'pending',
      showModal: true,
      modalImage: {
        url: largeImageURL,
        alt: tags,
      },
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false,
      status: 'idle',
    });
  };

  handleModalImageLoading = () => {
    this.setState({
      status: 'resolved',
    });
  };

  render() {
    const {
      searchName,
      searchItem,
      status,
      page,
      totalPages,
      showModal,
      modalImage,
    } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchItem={searchItem} onClick={this.handleImageClick} />
        {status === 'pending' && <Loader />}

        {status === 'rejected' && (
          <div>
            <p>No result of searching {searchName}</p>
          </div>
        )}

        {searchItem.length > 0 &&
          status !== 'pending' &&
          page <= totalPages && (
            <Button text="Load more" onClick={this.handleLoad}></Button>
          )}

        {showModal && (
          <Modal
            image={modalImage}
            onClose={this.handleModalClose}
            onLoad={this.handleModalImageLoading}
          />
        )}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}

export default App;
