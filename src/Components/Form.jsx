import React from 'react';
const styles = {
  form: {
    width: '100%',
    height: '2vw',
    backgroundColor: 'transparent'
  },
  
};

class Form extends React.Component {
  state = {};

  render() {
    return (
      <div>
        
        <div >
          <form className="mb-2">
            <input
              type="text"
              placeholder={this.props.placeholder}
              onChange={e => this.props.getInputValue(e.target.value)}
              value={this.props.inputvalue}
              style={styles.form}
            />
          </form>
          <button
            className="btn btn-sm btn-seconary btn-success"
            onClick={() => this.props.onAdd()}
          >
            {this.props.buttonName}
          </button>
        </div>
      </div>
    );
  }
}

export default Form;
