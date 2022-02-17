import React, { Component } from 'react';
// import { GlobalStyle } from './components/GlobalStyle';
import Swal from 'sweetalert2';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import ApiService from './components/apiService';

const newApiService = new ApiService();

class App extends Component {
  state = {
    imageName: '',
    page: 1,
    loading: false,
    showModal: false,
    images: null,
    error: null,
    imgModal: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    if (prevName !== nextName) {
      this.setState({ loading: true });

      newApiService.query = nextName;
      newApiService.resetPage();
      this.fetchAdditionalImages();
    }
  }

  fetchAdditionalImages = () => {
    const { images, imageName } = this.state;

    this.setState({
      loading: true,
      scroll: true,
    });
    return newApiService
      .fetchImages()
      .then(({ hits }) => {
        const prevStateImages = images ? images : [];
        this.setState({ images: [...prevStateImages, ...hits] });
        if (hits.length === 0) {
          Swal.fire(`Cannot find the image on your request ${imageName}`);
          return;
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  toggleModal = largeImageURL => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      imgModal: largeImageURL,
    }));
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { images, showModal, loading, imgModal } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}
        {images && (
          <ImageGallery
            onClick={this.toggleModal}
            images={images}
          ></ImageGallery>
        )}
        {images && <Button onClick={this.fetchAdditionalImages} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={imgModal} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
