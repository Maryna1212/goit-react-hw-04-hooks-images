import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchLabel,
  SearchInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event =>
    setImageName(event.currentTarget.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      return Swal.fire(
        `There are no image on your request ${imageName}. Please try again!`,
      );
    }

    onSubmit(imageName);
    setImageName('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchLabel>Search</SearchLabel>
        </SearchFormButton>

        <SearchInput
          type="text"
          name="imageName"
          value={imageName}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
