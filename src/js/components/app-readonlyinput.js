import React from 'react'


export default(props) => {
  return (
    <input type="text" className="form-control"
      value={props.value}
      readOnly
    />
  );
};
