import React from "react";

const GetInTouch = ({ heading, message, email }) => {
  let display = message + " <a href=mailto:"+email+">"+email+"</a>.";
  return (
    <>
      <h2 className="display-4 pb-3 text-center">{heading}</h2>
      <p className="lead text-center pb-3"
      	dangerouslySetInnerHTML={{__html:display}}>
        {/*{message}, <a href={`mailto:${email}`}>{email}</a>.*/}
      </p>
    </>
  );
};

export default GetInTouch;
