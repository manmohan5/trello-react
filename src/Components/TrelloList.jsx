import React from 'react';
import Cards from '../data/Cards';

const Styles = {
  container: {
    backgroundColor: '#ccc',
    borderRadius: 3,
    width: 200,
    height: '100%',
    padding: 8,
    marginRight: 10
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between'
  }
};

const TrelloList = props => {
  return (
    <div style={Styles.container}>
      <div style={Styles.content}>
        <h6 className="mt-2">{props.name}</h6>
        <button className="btn  btn-sm " onClick={() => props.onDelete(props.id)}>X</button>
      </div>
      <Cards id={props.id} key={props.id} />
    </div>
  );
};

export default TrelloList;
