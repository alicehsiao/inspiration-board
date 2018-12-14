import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
// import NewCardForm from './NewCardForm';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    const { url, boardName } = this.props;
    axios.get(`${url}boards/${boardName}/cards`)
      .then((response) => {
        const cardList = response.data.map((element) => {
          const newCard = {
            ...element.card,
          }

          return newCard;
        });
        this.setState({cards: cardList});
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  deleteCard = (id) => {
    const { url } = this.props;
    axios.delete(`${url}cards/${id}`)
      .then((response) => {
        let updatedCardList = this.state.cards.filter(element => element.id !== response.data.card.id);

        this.setState({cards: updatedCardList});
      })
      .catch((error) => {
        console.log(error.message);
      })
  }


  render() {
    const allCards = this.state.cards.map((card) => {
      return <Card key={card.id}
                       {...card}
                       onDeleteCallback={ this.deleteCard } />
    });

    return (
      <div className="board">
        { allCards }
      </div>
    )
  }

}

Board.propTypes = {
  boardName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Board;
