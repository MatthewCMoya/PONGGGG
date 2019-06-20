import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { AppStateContext } from '../../../contexts';
import { pongApi } from '../../../lib';

class AddPlayer extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      displayName: null,
      avatar: null,
      image: null,
      imageUrl: null,
      error: null,
      fileName: 'No file selected...',
    };
  }

  updateState = (property, e) => {
    this.setState({ [property]: e.target.value });
  }

  fileSelected = (evt) => {
    const newImage = evt.target.files[0];
    if (!newImage || !newImage.type.startsWith('image')) return;

    if (newImage.size > 1500000) {
      this.fileSizeError();
      return;
    }
    this.loadReader(newImage);
  }

  fileSizeError = () => this.setState({ error: 'File size too large' });

  loadReader = (newImage) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      this.setState({
        imageUrl: reader.result,
        avatar: newImage.name.split(' ').join(''),
        image: reader.result.match(/.*base64,(.*)/)[1],
      });
    }, false);

    if (newImage) {
      reader.readAsDataURL(newImage);
    }
  }


  submit = async (e) => {
    e.preventDefault();
    const { name, displayName, avatar, image } = this.state;

    try {
      const player = { name, displayName, avatar, image };
      const addPlayer = await pongApi.addPlayer(player);
      
      if (addPlayer.message === 'User already exists') {
        window.alert(addPlayer.message);
      }

      if (addPlayer.message === 'some error. the put failed') {
        window.alert('Something is broken. Talk to Matt')
      }

      this.props.onPageSelected('home');
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { imageUrl } = this.state;
    return (
      <AppStateContext.Consumer>
        {(context) => (
          <React.Fragment>
            <section className="wrapper quarantined add-player">
              <h3 className="text-primary font-weight-bold header">Add a Player</h3>
              <form onSubmit={this.submit} className="form-duder">
                <label>Name</label>
                <input
                  required
                  type="text"
                  onChange={(e) => { this.updateState('name', e) }}
                  placeholder="Bruce (DO NOT INCLUDE SPACES)"
                />
                <label>Display Name</label>
                <input
                  required
                  type="text"
                  onChange={(e) => { this.updateState('displayName', e) }}
                  placeholder="BATMAN"
                />
                <label>Upload your Image</label>
                <input
                  type="file"
                  onChange={this.fileSelected}
                  accept="image/*"
                />
                {imageUrl && <img className="preview" src={imageUrl} alt="placeholder" />}
                <Button className="home-button" type="submit">Submit</Button>
              </form>
            </section>
          </React.Fragment>
        )}
      </AppStateContext.Consumer>
    );
  }
}

export default AddPlayer;

