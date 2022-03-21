import React, { useState, useEffect } from 'react';
import AppStyles from './components/App.styled';
import Swal from 'sweetalert2';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import ApiService from './components/apiService';

const newApiService = new ApiService();

export default function App() {
  const [imageName, setImageName] = useState('');
  // const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [imgModal, setImgModal] = useState(null);

  useEffect(() => {
    if (imageName) {
      setLoading(true);
      setImages(null);
      newApiService.query = imageName;
      newApiService.resetPage();
      newApiService
        .fetchImages()
        .then(({ hits }) => {
          setImages(hits);

          if (hits.length === 0) {
            setImages(null);
            Swal.fire(`Cannot find the image on your request ${imageName}`);
            return;
          }
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [imageName]);

  const fetchAdditionalImages = () => {
    setLoading(true);
    return newApiService
      .fetchImages()
      .then(({ hits }) => {
        setImages([...images, ...hits]);
        if (hits.length === 0) {
          Swal.fire(`Cannot find the image on your request ${imageName}`);
          return;
        }
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  const toggleModal = largeImageURL => {
    setShowModal(prevState => !prevState);
    setImgModal(largeImageURL);
  };

  const handleFormSubmit = imageName => {
    setImageName(imageName.toLowerCase());
    setShowModal(false);
    setImgModal(null);
  };

  return (
    <AppStyles>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <Loader />}
      {images && (
        <ImageGallery onClick={toggleModal} images={images}></ImageGallery>
      )}
      {images && <Button onClick={fetchAdditionalImages} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={imgModal} alt="" />
        </Modal>
      )}
    </AppStyles>
  );
}
