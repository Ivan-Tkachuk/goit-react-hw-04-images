import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ searchItem, onClick }) => {
  return (
    <Gallery>
      {searchItem.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={onClick}
          ></ImageGalleryItem>
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  searchItem: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func.isRequired,
};


export default ImageGallery;