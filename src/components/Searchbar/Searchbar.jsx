import React from 'react';
import { toast } from 'react-toastify';
import { Header, Form, Field, Button, ButtonLabel } from './Searchbar.styled';
import PropTypes from 'prop-types';

export default class Searchbar extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchName: '',
  };

  handleNameChange = event => {
    this.setState({
      searchName: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchName.trim() === '') {
      return toast.error('Enter the search name please');
    }
    this.props.onSubmit(this.state.searchName);

    this.setState({
      searchName: '',
    });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <Field
            name="searchName"
            value={this.state.searchName}
            onChange={this.handleNameChange}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}
