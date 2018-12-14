import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';

import './Board.css';
import Card from './Card';
// import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: CARD_DATA["cards"],
    };
  }

  render() {
    console.log(this.state.cards);
    const cardList = this.state.cards.map((card, i) => {
      return <Card key={i} text={card.text} emoji={card.emoji} />
    });

    return (
      <div className="board">
        { cardList }
      </div>
    )
  }

}

Board.propTypes = {
  boardName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Board;
