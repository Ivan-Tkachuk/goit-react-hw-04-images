import { toast } from 'react-toastify';
import { Header, Form, Field, Button, ButtonLabel } from './Searchbar.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = event =>
    setSearchName(event.currentTarget.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();

    if (searchName.trim() === '') {
      return toast.error('Enter the search name please');
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Field
          name="searchName"
          value={searchName}
          onChange={handleNameChange}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
