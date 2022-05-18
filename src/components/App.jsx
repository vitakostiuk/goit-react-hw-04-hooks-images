import { useState, useEffect } from 'react';
import 'react-notifications/lib/notifications.css';
import { BallTriangle } from 'react-loader-spinner';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { mapper } from '../utils/mapper';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { fetchImages } from '../services/pixabay-api';
import { Modal } from './Modal';
import { Button } from './Button';
import s from './App.module.css';

export const App = () => {
  const [imgName, setImgName] = useState('');
  const [images, setImages] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hiddenBtn, setHiddenBtn] = useState(true);
  const [error, setError] = useState(null);

  //first render
  useEffect(() => {
    setImages(null);
    setHiddenBtn(true);

    const getImages = async () => {
      try {
        setLoading(true);
        let images = await fetchImages(imgName);
        images = images.hits;
        if (images.length === 0) {
          NotificationManager.warning(`There are not images with such name.`);
          return setImages(null);
        }
        setImages(mapper(images));
        setHiddenBtn(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (imgName) getImages();
  }, [imgName]);

  // pagination(load more)
  useEffect(() => {
    setHiddenBtn(true);

    const getImages = async () => {
      try {
        setLoading(true);
        let images = await fetchImages(page);
        images = images.hits;
        if (images.length === 0) {
          NotificationManager.warning(`There are not images with such name.`);
          return setImages(null);
        }
        setImages(prevImages => [...prevImages, ...mapper(images)]);
        setHiddenBtn(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (page !== 1) getImages();
  }, [page]);

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearchbarSubmit = imgName => {
    setImgName(imgName);
    setPage(1);
    setLoading(false);
  };

  const toogleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const openImage = largeImage => {
    setShowModal(prevShowModal => !prevShowModal);
    setLargeImage(largeImage);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      {error && <div>{error.message}</div>}
      <ImageGallery
        images={images}
        imgName={imgName}
        openLargeImage={openImage}
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
      {!hiddenBtn && <Button onClick={incrementPage} aria-label="Load more" />}
      {showModal && (
        <Modal
          onClose={toogleModal}
          largeImage={largeImage}
          imgName={imgName}
        />
      )}
      <NotificationContainer />
    </>
  );
};
