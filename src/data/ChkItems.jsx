import React, { Component } from 'react';
import TrelloCheckItems from '../Components/TrelloCheckItems';
import Form from '../Components/Form';
const API_KEY = '12c912723bfd4c449c8ff829df1f9c05';
const TOKEN =
  '8ef6820a89e26e39f0bfa97b74866e99a0fdbef4c9f1c3b69f51e67ffe4c7dad';

class ChkItems extends Component {
  constructor() {
    super();
    this.state = {
      checkItems: [],
      checked: false,
      addChkItemInput: ''
    };
  }
  componentDidMount() {
    fetch(
      `https://api.trello.com/1/checklists/${this.props.chkListID}/checkItems?key=${API_KEY}&token=${TOKEN}`,
      {
        method: 'GET'
      }
    )
      .then(res => res.json())
      .then(checkItem => {
        this.setState({
          checkItems: checkItem
        });
      });
  }
  getInputValue = e => {
    this.setState({
      addChkItemInput: e
    });
  };
  dltChkItem = id => {
    const idCheckItem = id;

    fetch(
      `https://api.trello.com/1/checklists/${this.props.chkListID}/checkItems/${idCheckItem}?key=${API_KEY}&token=${TOKEN}`,
      {
        method: 'DELETE'
      }
    ).then(() => {
      this.setState({
        checkItems: this.state.checkItems.filter(
          cItem => cItem.id !== idCheckItem
        )
      });
    });
  };

  addCheckItemsHandler = () => {
    const checkItemName = this.state.addChkItemInput;
    if (checkItemName !== '') {
      fetch(
        `https://api.trello.com/1/checklists/${this.props.chkListID}/checkItems?name=${checkItemName}&pos=bottom&checked=false&key=${API_KEY}&token=${TOKEN}`,
        { method: 'POST' }
      )
        .then(res => res.json())
        .then(checkItem => {
          this.setState({
            checkItems: this.state.checkItems.concat(checkItem)
          });
        });
    } else {
      alert('can not add empty check item');
    }
  };

  handelChange = (e, checkItemID) => {
    const isChecked = e;

    fetch(
      `https://api.trello.com/1/cards/${this.props.cardId}/checkItem/${checkItemID}?state=${isChecked}&key=${API_KEY}&token=${TOKEN}`,
      {
        method: 'PUT'
      }
    )
      .then(ChkItemdata => ChkItemdata.json())
      .then(data => {
        this.setState({
          checked: data.state
        });
      });
  };

  componentDidUpdate(prevPros, prevState) {
    if (prevState.checked !== this.state.checked) {
      fetch(
        `https://api.trello.com/1/checklists/${this.props.chkListID}/checkItems?key=${API_KEY}&token=${TOKEN}`,
        {
          method: 'GET'
        }
      )
        .then(res => res.json())
        .then(checkItem => {
          this.setState({
            checkItems: checkItem
          });
        });
    }
  }

  render() {
    let checkItems = this.state.checkItems;

    return (
      <React.Fragment>
        {checkItems.map(data => (
          <TrelloCheckItems
            key={data.id}
            checkItemID={data.id}
            checkItemName={data.name}
            onDelete={this.dltChkItem}
            handelChange={this.handelChange}
            checked={data.state}
          />
        ))}
        <Form
          placeholder="add a Check Item"
          buttonName="Add Check Item"
          onAdd={this.addCheckItemsHandler}
          getInputValue={this.getInputValue}
        />
      </React.Fragment>
    );
  }
}

export default ChkItems;
