import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

export class App extends Component {
  state = {
    imgName: '',
  };

  handleSearchbarSubmit = imgName => {
    this.setState({ imgName });
  };

  render() {
    const { imgName } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        <ImageGallery imgName={imgName} />
      </>
    );
  }
}
