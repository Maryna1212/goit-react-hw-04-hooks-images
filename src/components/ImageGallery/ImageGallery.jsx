import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export default function ImageGallery({ images, onClick }) {
  return (
    <ImageGalleryList>
      {images.map(({ tags, webformatURL, largeImageURL }, index) => {
        return (
          <ImageGalleryItem
            key={index}
            imgForModal={() => {
              onClick(largeImageURL);
            }}
            data={{ index, webformatURL, tags, largeImageURL }}
          />
        );
      })}
    </ImageGalleryList>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.string,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    }),
  ),
  onClick: PropTypes.func.isRequired,
};
