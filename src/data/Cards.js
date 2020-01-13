import React, { Component } from 'react';
import TrelloCards from '../Components/TrelloCards';
import Modal from '../Components/Modal';
import Form from '../Components/Form';

const API_KEY = '12c912723bfd4c449c8ff829df1f9c05';
const TOKEN =
  '8ef6820a89e26e39f0bfa97b74866e99a0fdbef4c9f1c3b69f51e67ffe4c7dad';

let cardId;
let card_name;
class Cards extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      open: false,
      addCardInput: ''
    };
  }

  getInputValue = e => {
    this.setState({
      addCardInput: e
    });
  };
  deleteCard = id => {
    event.stopPropagation();
    let allCards = this.state.cards;
    fetch(
      `https://api.trello.com/1/cards/${id}?key=${API_KEY}&token=${TOKEN}`,
      {
        method: 'DELETE'
      }
    ).then(() => {
      let CardsafterDelete = allCards.filter(card => card.id !== id);
      this.setState({
        cards: CardsafterDelete,
        
      });
    });
  };

  handleAdd = () => {
    const cardName = this.state.addCardInput;
    if (cardName !== '') {
      fetch(
        `https://api.trello.com/1/cards?name=${cardName}&idList=${this.props.id}&keepFromSource=all&key=${API_KEY}&token=${TOKEN}`,
        {
          method: 'POST'
        }
      )
        .then(cardData => cardData.json())
        .then(newCard =>
          this.setState({ cards: this.state.cards.concat([newCard]) })
        );
    } else {
      alert('can not add empty card');
    }
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  getID = props => {
    cardId = props.id;
    card_name = props.name;
  };

  componentDidMount() {
    fetch(
      `https://api.trello.com/1/lists/${this.props.id}/cards?key=${API_KEY}&token=${TOKEN}`,
      {
        method: 'GET'
      }
    )
      .then(data => data.json())
      .then(data => {
        this.setState({
          cards: data
        });
      });
  }

  render() {
    const cardsData = this.state.cards;

    return (
      <React.Fragment>
        <React.Fragment>
          {cardsData.map(card => (
            <TrelloCards
              name={card.name}
              id={card.id}
              key={card.id}
              onDelete={this.deleteCard}
              getCheckList={this.getID}
              onOpenModal={this.onOpenModal}
            />
          ))}
          <Form
            placeholder="add a card"
            buttonName="Add Card"
            onAdd={this.handleAdd}
            getInputValue={this.getInputValue}
          />
        </React.Fragment>
        <Modal
          open={this.state.open}
          closeModal={this.onCloseModal}
          cardId={cardId}
          card_name={card_name}
        />
      </React.Fragment>
    );
  }
}

export default Cards;
