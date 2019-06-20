import React, { Component } from 'react';
import avatar1 from '../../../assets/img/blanca.jpg';

class PlayerCard extends Component {
  constructor() {
    super()
    this.state = {
      image: avatar1,
    }
  }

  async componentDidMount() {
    const { avatar } = this.props.player;
    if (avatar) {
      this.handleImage(avatar);
    }
  }

  async componentWillReceiveProps(nextProps){
    if(nextProps.player.name !== this.props.player.name){
      const { avatar } = nextProps.player;
      if (avatar) {
        this.handleImage(avatar);
      }
    }
  }

  handleImage = async (avatar) => {
    const fetchResult = await fetch(`/PLAYERS-IMAGES/${avatar}`);
    if (fetchResult.ok) {
      this.setState({ image: fetchResult.url })
    }
  }
  
  render() {
    const { name, displayName, record, rating } = this.props.player;
    const { image } = this.state;
    
    return (
      <div className="player-1">
        <h2 className="title">{name}</h2>
        <img alt="No Avatar !" src={image} className="avatar" />
        <h3 className="name">"{displayName}"</h3>
        <h5 className="record">{`${record.wins} - ${record.losses}`}</h5>
        <h5 className="record">{rating}</h5>
      </div>
    )
  }
}

export default PlayerCard;
