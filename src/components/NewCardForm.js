import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

class NewCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      emoji: "",
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const { text, emoji } = this.state;
    const newCard = {
      text,
      emoji,
    }
    this.props.sendSubmissionCallback(newCard);
    this.setState({
      text: "",
      emoji: "",
    })
  }

  onFormChange = (event) => {
    const updateState = {};

    const fieldName = event.target.name;
    const value = event.target.value;
    updateState[fieldName] = value;
    this.setState(updateState);
  }

  generateSelectFields = () => {
    return EMOJI_LIST.map((field, i) => {
      return <option key={i} value={ field }>{emoji.getUnicode(field)}</option>
    });
  }

  render() {
    return (
      <div className="card">
        <section className="card__content">
          <section className="new-card-form__header">
            <p>Add a card</p>
          </section>
          <section className="card__content-text">
            <form className="new-card-form__form" onSubmit={this.onFormSubmit}>
              <section className="form_item">
                <label htmlFor="text" className="label_item">Text</label>
                <textarea name="text" onChange={ this.onFormChange } value={ this.state.text }></textarea>
              </section>
              <section className="form_item">
                <label htmlFor="emoji" className="label_item">Emoji</label>
                <select className="new-card-form__form-select" name="emoji" onChange={ this.onFormChange } value={ this.state.emoji }>
                  {
                    this.generateSelectFields()
                  }
                </select>
              </section>
              <section className="submit_item">
                <input type="submit" value="+" className="new-card-form__form-button button" />
              </section>
            </form>
          </section>
        </section>
      </div>

    )
  }
}

NewCardForm.propTypes = {
  sendSubmissionCallback: PropTypes.func.isRequired,
}
export default NewCardForm;
