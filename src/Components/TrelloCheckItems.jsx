import React from 'react';


const TrelloCheckItems = props => {
  const check=props.checked==='complete'?true:false
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <input type="checkbox"  checked={check} onChange={(e)=>props.handelChange(e.target.checked,props.checkItemID)}/>
       
        <span className="ml-1">{props.checkItemName}</span>
      </div>

      <button
        className="btn btn-light btn-xs dltChkItem"
        onClick={() => props.onDelete(props.checkItemID)}
      >
        x
      </button>
    </div>
  );
};

export default TrelloCheckItems;
