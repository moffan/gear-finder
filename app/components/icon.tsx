import React from "react";

const Icon: React.FunctionComponent<{ icon: string }> = ({ icon }) => (
  <i className="material-icons">{icon}</i>
);

export default Icon;
