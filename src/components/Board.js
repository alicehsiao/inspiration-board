import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
// import NewCardForm from './NewCardForm';

const URL = 'https://inspiration-board.herokuapp.com/boards/ahsiao/cards';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    axios.get(URL)
      .then((response) => {
        const cardList = response.data.map((element) => {
          return <Card key={element.card.id} {...element.card} />
        });
        this.setState({cards: cardList});
      })
      .catch((error) => {
        console.log(error.message);
      })
  }


  render() {
    return (
      <div className="board">
        { this.state.cards }
      </div>
    )
  }

}

Board.propTypes = {
  boardName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Board;
