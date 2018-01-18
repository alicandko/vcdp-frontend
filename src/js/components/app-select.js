import React from 'react'


export default(props) => {
  var options = props.options.map((option, i) => {
    return <option key={i}>{option}</option>
  });

  return (
    <select className="form-control" onChange={props.handler} value={props.value}>
      <option selected disabled>Please select</option>
      {options}
    </select>
  );
};
