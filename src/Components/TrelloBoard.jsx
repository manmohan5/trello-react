import React from 'react';
import { Link } from 'react-router-dom';

const Styles = {
  Cardcontainer: {
    marginBottom: 6,
    width: '15vw',
    cursor: 'pointer',
    marginTop: 6
  }
};

const Board = props => {

  return (
    <div className="card " style={Styles.Cardcontainer}>
      <Link to={`/boards/${props.id}`}>
        <p className="  m-1  mb=8">
          <small>{props.name}</small>
        </p>
      </Link>
    </div>
  );
};

export default Board;
