import { useState } from 'react';
// import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import { MdOutlineSearch } from 'react-icons/md';
import s from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [imgName, setImgName] = useState('');

  // const handleNameChange = e => {
  //   setImgName(e.currentTarget.value.toLowerCase());
  // };

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

// export class Searchbar extends Component {
//   state = {
//     imgName: '',
//   };

//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   handleNameChange = e => {
//     this.setState({ imgName: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     const { imgName } = this.state;
//     const { onSubmit } = this.props;
//     e.preventDefault();

//     if (imgName.trim() === '') {
//       NotificationManager.warning(
//         'Search bar is empty! Please, enter a request.'
//       );
//       return;
//     }
//     onSubmit(imgName);
//     this.setState({ imgName: '' });
//   };

//   render() {
//     const { imgName } = this.state;

//     return (
//       <header className={s.Searchbar}>
//         <form className={s.Form} onSubmit={this.handleSubmit}>
//           <button type="submit" className={s.Button} aria-label="Search images">
//             <MdOutlineSearch size="18" fill="#7a7a7a" />
//           </button>

//           <input
//             className={s.Input}
//             type="text"
//             name="imgName"
//             value={imgName}
//             onChange={this.handleNameChange}
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos..."
//           />
//         </form>
//       </header>
//     );
//   }
// }
