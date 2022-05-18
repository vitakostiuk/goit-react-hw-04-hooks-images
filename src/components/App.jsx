import { useState, useEffect, useRef } from 'react';
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
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hiddenBtn, setHiddenBtn] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (imgName === '') return;
    setHiddenBtn(true);

    const getImages = async () => {
      try {
        setLoading(true);
        let data = await fetchImages(imgName, page);
        data = data.hits;
        if (data.length === 0) {
          NotificationManager.warning(`There are not images with such name.`);
          return setImages([]);
        }
        setImages(prevImages => [...prevImages, ...mapper(data)]);
        setHiddenBtn(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [imgName, page]);

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearchbarSubmit = imgName => {
    setImgName(imgName);
    setPage(1);
    setImages([]);
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
