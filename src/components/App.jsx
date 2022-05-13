import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { BallTriangle } from 'react-loader-spinner';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { fetchImages } from '../services/pixabay-api';
import { Modal } from './Modal';
import { Button } from './Button';
import s from './App.module.css';

export class App extends Component {
  state = {
    imgName: '',
    images: null,
    showModal: false,
    largeImage: null,
    page: 1,
    loading: false,
    hiddenBtn: true,
    error: null,
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { imgName, page } = this.state;
    const prevName = prevState.imgName;
    const currentName = imgName;
    const prevPage = prevState.page;
    const currentPage = page;

    if (prevName !== currentName) {
      this.setState({ loading: true, hiddenBtn: true, images: null });
      fetchImages(currentName, page)
        .then(images => images.hits)
        .then(images => {
          if (images.length === 0) {
            NotificationManager.warning(`There are not images with such name.`);
            return this.setState({
              images: null,
            });
          }
          this.setState({
            images,
            hiddenBtn: false,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }

    if (prevName === currentName && prevPage !== currentPage) {
      this.setState({ loading: true, hiddenBtn: true });
      fetchImages(currentName, page)
        .then(images => images.hits)
        .then(images => {
          return this.setState(prevState => ({
            images: [...prevState.images, ...images],
            hiddenBtn: false,
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSearchbarSubmit = imgName => {
    this.setState({ imgName });
    this.setState({ page: 1 });
    this.setState({ loading: false });
  };

  toogleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openImage = largeImage => {
    this.setState(({ showModal }) => ({ showModal: !showModal, largeImage }));
  };

  render() {
    const {
      images,
      showModal,
      largeImage,
      imgName,
      loading,
      hiddenBtn,
      error,
    } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        {error && <div>{error.message}</div>}
        <ImageGallery
          images={images}
          imgName={imgName}
          openLargeImage={this.openImage}
        />
        {loading && (
          <div className={s.Loader}>
            <BallTriangle
              height="50"
              width="50"
              color="#49b6ff"
              ariaLabel="loading"
            />
          </div>
        )}
        {!hiddenBtn && (
          <Button onClick={this.incrementPage} aria-label="Load more">
            Load more
          </Button>
        )}
        {showModal && (
          <Modal onClose={this.toogleModal}>
            <img src={largeImage} alt={imgName} width="800" />
          </Modal>
        )}
        <NotificationContainer />
      </>
    );
  }
}

//---Варіант зі стейт-машиною і async-await----
/*
import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { BallTriangle } from 'react-loader-spinner';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { fetchImages } from '../services/pixabay-api';
import { Modal } from './Modal';
import { Button } from './Button';
import s from './App.module.css';

export class App extends Component {
  state = {
    imgName: '',
    images: null,
    showModal: false,
    largeImage: null,
    page: 1,
    hiddenBtn: true,
    error: null,
    status: 'idle',
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { imgName, page } = this.state;
    const prevName = prevState.imgName;
    const currentName = imgName;
    const prevPage = prevState.page;
    const currentPage = page;

    if (prevName !== currentName) {
      this.setState({ status: 'pending' });
      try {
        let images = await fetchImages(currentName, page);
        images = images.hits;
        if (images.length === 0) {
          NotificationManager.warning(`There are not images with such name.`);
          return this.setState({
            status: 'idle',
          });
        }
        this.setState({
          images,
          status: 'resolved',
        });
      } catch (error) {
        this.setState({ error, status: 'error' });
      }
    }

    if (prevName === currentName && prevPage !== currentPage) {
      this.setState({ status: 'pending' });

      try {
        let images = await fetchImages(currentName, page);
        images = images.hits;
        return this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({ error, status: 'error' });
      }
    }
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSearchbarSubmit = imgName => {
    this.setState({ imgName, status: 'pending' });
    this.setState({ page: 1 });
  };

  toogleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openImage = largeImage => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage,
    }));
  };

  render() {
    const { images, showModal, largeImage, imgName, error, status } =
      this.state;

    return (
      <>
        {(status === 'idle' ||
          status === 'resolved' ||
          status === 'pending') && (
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
        )}
        {status === 'error' && <div>{error.message}</div>}
        {status === 'resolved' && (
          <ImageGallery
            images={images}
            imgName={imgName}
            openLargeImage={this.openImage}
          />
        )}
        {status === 'resolved' && (
          <Button onClick={this.incrementPage} aria-label="Load more">
            Load more
          </Button>
        )}
        {status === 'pending' && (
          <div className={s.Loader}>
            <BallTriangle
              height="50"
              width="50"
              color="#49b6ff"
              ariaLabel="loading"
            />
          </div>
        )}
        {showModal && (
          <Modal onClose={this.toogleModal}>
            <img src={largeImage} alt={imgName} width="800" />
          </Modal>
        )}
        <NotificationContainer />
      </>
    );
  }
}
*/
