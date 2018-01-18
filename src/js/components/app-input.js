import React from 'react'


export default(props) => {
  const { handler, value, type } = props;

  return (
    <input type={type ? type : "text" } className="form-control"
      onChange={handler}
      value={value}
    />
  );
};
