import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

class Card extends Component {

  onDelete = (event) => {
    event.preventDefault();
    this.props.onDeleteCallback(this.props.id);
  }

  render() {
    const { text } = this.props;

    return (
      <div className="card">
        <section className="card__content">
          <section className="card__content-text">
            {text}
          </section>
          <section className="card__content-emoji">
            {this.props.emoji && emoji.getUnicode(this.props.emoji)}
          </section>
          <section className="card__delete">
            <button onClick={this.onDelete}>Delete</button>
          </section>
        </section>
      </div>
    )
  }
}

Card.propTypes = {
  text: PropTypes.string,
  emoji: PropTypes.string,
  onDeleteCallback: PropTypes.func.isRequired,
};

export default Card;
