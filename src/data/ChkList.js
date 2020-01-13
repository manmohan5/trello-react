import React, { Component } from 'react';
import ChkItems from './ChkItems';
import Form from '../Components/Form';

const API_KEY = '12c912723bfd4c449c8ff829df1f9c05';
const TOKEN =
  '8ef6820a89e26e39f0bfa97b74866e99a0fdbef4c9f1c3b69f51e67ffe4c7dad';

const styles = {
  marginTop: '3vw',
  width: '25vw',
  fontWeight: 'bold',
  fontStyle: 'italic',
  color: '#218F76',
  hr: {
    border: ' 0.3px solid #218F76 '
  }
};

class ChkList extends Component {
  constructor() {
    super();
    this.state = {
      CheckLists: [],
      addChkListInput: ''
    };
  }

  getInputValue = e => {
    this.setState({
      addChkListInput: e
    });
  };
  componentDidMount() {
    fetch(
      `https://api.trello.com/1/cards/${this.props.cardId}/checklists?key=${API_KEY}&token=${TOKEN}`,
      {
        method: 'GET'
      }
    )
      .then(res => res.json())
      .then(checklist => {
        this.setState({
          CheckLists: checklist
        });
      });
  }

  dltCheckListHandler = id => {
    const checklistID = id;

    fetch(
      `https://api.trello.com/1/checklists/${checklistID}?key=${API_KEY}&token=${TOKEN}`,
      {
        method: 'DELETE'
      }
    ).then(() => {
      this.setState({
        CheckLists: this.state.CheckLists.filter(
          cList => cList.id !== checklistID
        )
      });
    });
  };

  addCheckListHandler = () => {
    const checklistName = this.state.addChkListInput;
    if (checklistName !== '') {
      fetch(
        `https://api.trello.com/1/cards/${this.props.cardId}/checklists?name=${checklistName}&key=${API_KEY}&token=${TOKEN}`,
        {
          method: 'POST'
        }
      )
        .then(res => res.json())
        .then(checklist => {
          this.setState({
            CheckLists: this.state.CheckLists.concat(checklist),
            addChkListInput: ''
          });
        });
    } else {
      alert('can not add empty check list');
    }
  };

  render() {
    let checklists = this.state.CheckLists.map(checklist => (
      <div key={checklist.id}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5 className="mt-1">{checklist.name}</h5>
          <button
            id={checklist.id}
            onClick={() => this.dltCheckListHandler(checklist.id)}
            className="btn  btn-sm btn-danger"
          >
            X
          </button>
        </div>

        <br></br>
        <ChkItems chkListID={checklist.id} cardId={this.props.cardId}/>
        <hr></hr>
      </div>
    ));
    return (
      <React.Fragment>
        <h5 style={styles}>{this.props.card_name}</h5>
        <hr style={styles.hr}></hr>
        <Form
          placeholder="add a Checklist"
          buttonName="Add Checklist"
          onAdd={this.addCheckListHandler}
          getInputValue={this.getInputValue}
        />

        <div>{checklists}</div>
      </React.Fragment>
    );
  }
}
export default ChkList;
