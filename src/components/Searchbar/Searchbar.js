import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineSearch } from 'react-icons/md';
import s from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    imgName: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleNameChange = e => {
    this.setState({ imgName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    const { imgName } = this.state;
    const { onSubmit } = this.props;
    e.preventDefault();

    if (imgName.trim() === '') {
      alert('Введите имя картинки');
      return;
    }
    onSubmit(imgName);
    this.setState({ imgName: '' });
  };

  render() {
    const { imgName } = this.state;

    return (
      <header className={s.Searchbar}>
        <form className={s.Form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.Button}>
            <MdOutlineSearch size="18" fill="#7a7a7a" />
          </button>

          <input
            className={s.Input}
            type="text"
            name="imgName"
            value={imgName}
            onChange={this.handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos..."
          />
        </form>
      </header>
    );
  }
}
