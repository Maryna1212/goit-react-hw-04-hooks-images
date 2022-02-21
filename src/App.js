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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [imgModal, setImgModal] = useState(null);

  useEffect(() => {
    const fetchImages = () => {
      setLoading(true);
      setImages(null);
      newApiService.query = imageName;
      newApiService.resetPage();
      newApiService
        .fetchImages({ searchName: imageName, page })
        .then(responseImages => {
          setImages(prevImages => [...prevImages, ...responseImages]);
          setPage(prevPage => prevPage + 1);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    };

    fetchImages();
  }, [imageName, page]);

  const fetchAdditionalImages = () => {
    setLoading(true);
    return newApiService
      .fetchImages()
      .then(({ hits }) => {
        const prevStateImages = images ? images : [];
        setImages([...prevStateImages, ...hits]);
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
    setPage(1);
    setShowModal(false);
    setImgModal(null);
    setError(error);
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
