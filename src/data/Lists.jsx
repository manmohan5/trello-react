import React, { Component } from 'react';
import TrelloList from '../Components/TrelloList';
import Form from '../Components/Form';

const API_KEY = '12c912723bfd4c449c8ff829df1f9c05';
const TOKEN =
  '8ef6820a89e26e39f0bfa97b74866e99a0fdbef4c9f1c3b69f51e67ffe4c7dad';

const Styles = {
  listStyle: {
    display: 'flex',
    flexDirection: 'row'
  }
};

class Lists extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      addListInput: '',
      open: false,
      cards: []
    };
  }

  getInputValue = e => {
    this.setState({
      addListInput: e
    });
  };
  componentDidMount() {
    const boardID = this.props.match.params.id;
    fetch(
      `https://api.trello.com/1/boards/${boardID}/lists?key=${API_KEY}&token=${TOKEN}`,
      {
        method: 'GET'
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          lists: data
        });
      });
  }

  handleDeleteList = id => {
    fetch(
      `https://api.trello.com/1/lists/${id}/closed?value=true&key=${API_KEY}&token=${TOKEN}`,
      {
        method: 'PUT'
      }
    ).then(() =>
      this.setState({
        lists: this.state.lists.filter(list => list.id !== id)
      })
    );
  };

  handleAddList = () => {
    
    const listName = this.state.addListInput;
    const listId = this.props.match.params.id;
    if (listName === '') {
      alert('can not add empty list');
    } else {
      fetch(
        `https://api.trello.com/1/lists?name=${listName}&idBoard=${listId}&pos=bottom&key=${API_KEY}&token=${TOKEN}`,
        {
          method: 'POST'
        }
      )
        .then(Response => Response.json())

        .then(newList =>
          this.setState({
            lists: this.state.lists.concat([newList]),

          
          })
        );
    }
  };

  render() {
    const lists = this.state.lists;

    return (
      <div style={Styles.listStyle}>
        <React.Fragment>
          {lists.map(list => (
            <TrelloList
              key={list.id}
              id={list.id}
              name={list.name}
              onDelete={this.handleDeleteList}
            />
          ))}
          <Form
            placeholder="add a list"
            buttonName="Add List"
            onAdd={this.handleAddList}
            getInputValue={this.getInputValue}
            
          />
        </React.Fragment>
      </div>
    );
  }
}
export default Lists;
