import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      errorMessage: [],
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
        let errorMsg = [];
        errorMsg.push('Unable to load board: ');

        if(error.response && error.response.data.errors){
           errorMsg.push(error.response.data.errors.text[0]);
        } else {
          errorMsg.push(error.message);
        }

        this.setState({
          errorMessage: errorMsg,
        })
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
        let errorMsg = [];
        errorMsg.push('Unable to delete card: ');

        if(error.response && error.response.data.errors){
           errorMsg.push(error.response.data.errors.text[0]);
        } else {
          errorMsg.push(error.message);
        }

        this.setState({
          errorMessage: errorMsg,
        })
      })
  }

  addCard = (newCard) => {
    const { url, boardName } = this.props;

    axios.post(`${url}boards/${boardName}/cards`, newCard)
      .then((response) => {
        newCard.id = response.data.id;
        const { cards } = this.state;

        cards.push(newCard);
        this.setState({
          cards,
        });
      })
      .catch((error) => {
        let errorMsg = [];
        errorMsg.push('Unable to add card: ');

        if(error.response && error.response.data.errors){
           errorMsg.push(error.response.data.errors.text[0]);
        } else {
          errorMsg.push(error.message);
        }

        this.setState({
          errorMessage: errorMsg,
        });
      })
  }


  render() {
    const allCards = this.state.cards.map((card) => {
      return <Card key={card.id}
                       {...card}
                       onDeleteCallback={ this.deleteCard } />
    });

    return (
      <section>
        { this.state.errorMessage.length > 0 &&
        <div className="validation-errors-display">
          <div className="validation-errors-display__list">
            { `${this.state.errorMessage[0]} ${this.state.errorMessage[1]}` }
          </div>
        </div> }
        <div className="board">
          { allCards }
          { this.state.errorMessage.length === 0 && <NewCardForm sendSubmissionCallback={ this.addCard } />}
        </div>
      </section>
    )
  }

}

Board.propTypes = {
  boardName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Board;
