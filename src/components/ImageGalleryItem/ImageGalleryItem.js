import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  imgName,
  onClick,
}) => (
  <li className={s.Item} onClick={() => onClick(largeImageURL)}>
    <img src={webformatURL} alt={imgName} className={s.Img} />
  </li>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  imgName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
