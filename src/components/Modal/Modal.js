import { useEffect } from 'react';
// import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, largeImage, imgName }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        console.log(e.code);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      console.log('Кликнули по бекдропу');
      onClose();
    }
  };

  return createPortal(
    <div className={s.Backdrop} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={largeImage} alt={imgName} width="800" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  imgName: PropTypes.string.isRequired,
};
