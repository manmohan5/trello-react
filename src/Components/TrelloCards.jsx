import React from 'react';
import { Link } from 'react-router-dom';
const styles = {
  container: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
};
const TrelloCards = props => {
  return (
    <React.Fragment>
      <div className="card w-100  mb-2 rounded" style={styles.container}>
        <Link to={`/boards/${props.id}`}>
          <p
            className="m-1"
            onClick={() => {
              props.getCheckList(props);
              props.onOpenModal();
            }}
          >
            <small>{props.name}</small>
          </p>
        </Link>

        <button
          onClick={() => props.onDelete(props.id)}
          className="btn btn-sm btn-seconary"
        >
          X
        </button>
      </div>
    </React.Fragment>
  );
};

export default TrelloCards;
