import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

export const ImageGallery = ({ imgName, images, openLargeImage }) => {
  return (
    <div>
      {images && (
        <div className={s.Container}>
          <ul className={s.List}>
            {images.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                imgName={imgName}
                onClick={openLargeImage}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  imgName: PropTypes.string.isRequired,
  openLargeImage: PropTypes.func.isRequired,
};
