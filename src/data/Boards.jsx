import React, { Component } from 'react';
import Board from '../Components/TrelloBoard';

const API_KEY = '12c912723bfd4c449c8ff829df1f9c05';
const TOKEN =
  '8ef6820a89e26e39f0bfa97b74866e99a0fdbef4c9f1c3b69f51e67ffe4c7dad';

class Boards extends Component {
  constructor() {
    super();
    this.state = {
      boards: []
    };
  }
  componentDidMount() {
    fetch(
      `https://api.trello.com/1/members/manmohanrathour/boards?key=${API_KEY}&token=${TOKEN}`,
      {
        method: 'GET'
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          boards: data
        });
      });
  }

  render() {
    const Data = this.state.boards;

    return Data.map(data => (
      <Board key={data.id} id={data.id} name={data.name} />
    ));
  }
}

export default Boards;



