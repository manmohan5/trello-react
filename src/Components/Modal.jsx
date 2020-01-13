import React from 'react';
import Modal from 'react-responsive-modal';
import ChkList from '../data/ChkList';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

class ModalComponent extends React.Component {

  render() {
    return (
      <div style={styles}>
        <Modal open={this.props.open} onClose={this.props.closeModal} >
          <ChkList
            cardId={this.props.cardId}
            card_name={this.props.card_name}
          />
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
