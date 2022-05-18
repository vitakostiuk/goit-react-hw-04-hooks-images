import { useState } from 'react';
// import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import { MdOutlineSearch } from 'react-icons/md';
import s from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [imgName, setImgName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (imgName.trim() === '') {
      NotificationManager.warning(
        'Search bar is empty! Please, enter a request.'
      );
      return;
    }
    onSubmit(imgName);
    setImgName('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.Form} onSubmit={handleSubmit}>
        <button type="submit" className={s.Button} aria-label="Search images">
          <MdOutlineSearch size="18" fill="#7a7a7a" />
        </button>

        <input
          className={s.Input}
          type="text"
          name="imgName"
          value={imgName}
          onChange={e => setImgName(e.currentTarget.value.toLowerCase())}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos..."
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
