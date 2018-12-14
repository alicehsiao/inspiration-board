import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

class Card extends Component {
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
        </section>
      </div>
    )
  }
}

Card.propTypes = {
  text: PropTypes.string,
  emoji: PropTypes.string
};

export default Card;
