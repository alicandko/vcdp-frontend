import React from 'react'


export default(props) => {
  return (
    <button
      type="button"
      className="btn btn-default btn-md"
      onClick={props.handler}>
      {props.txt}
    </button>
  );
};
