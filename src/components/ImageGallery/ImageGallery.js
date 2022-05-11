import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchImages } from '../../services/pixabay-api';
import { ImageGalleryItem } from '../ImageGalleryItem';
import s from './ImageGallery.module.css';
import { Modal } from '../Modal';

export class ImageGallery extends Component {
  state = {
    images: null,
    showModal: false,
    largeImage: null,
  };

  static propTypes = {
    imgName: PropTypes.string.isRequired,
  };

  componentDidUpdate = (prevProps, prevState) => {
    const prevImg = prevProps.imgName;
    const currentImg = this.props.imgName;

    if (prevImg !== currentImg) {
      fetchImages(currentImg)
        .then(images => images.hits)
        .then(images => {
          return this.setState({ images });
        });
    }
  };

  toogleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openImage = largeImage => {
    this.setState(({ showModal }) => ({ showModal: !showModal, largeImage }));
  };

  render() {
    const { images, showModal, largeImage } = this.state;
    const { imgName } = this.props;

    return (
      <div>
        {images && (
          <ul className={s.List}>
            {images.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                imgName={imgName}
                onClick={this.openImage}
              />
            ))}
          </ul>
        )}
        {showModal && (
          <Modal onClose={this.toogleModal}>
            <img src={largeImage} alt={imgName} width="600" />
          </Modal>
        )}
      </div>
    );
  }
}
