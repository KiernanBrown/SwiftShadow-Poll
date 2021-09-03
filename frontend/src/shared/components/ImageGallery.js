import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import './ImageGallery.css';

const ImageGallery = (props) => {
  return (
    <>
      <Carousel interval={null} controls={props.imgs.length > 1 ? true : false} indicators={props.imgs.length > 1 ? true : false}>
        {props.imgs.map((img) => (
          <Carousel.Item key={img.alt}>
            <img src={img.src} alt={img.alt} className="gallery-img" />
            <Carousel.Caption className='text-dark mb-4'>{img.alt}</Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ImageGallery;
