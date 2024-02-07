import React from "react";
import Avatar from "./Avatar";
function Persons({ id, userName, onClick, selected, online }) {
  const style = { display: "block" };
  return (
    <div
      key={id}
      onClick={() => onClick(id)}
      className={"user-icon " + (selected ? "blu" : "")}
    >
      {selected && <div className="p1"> </div>}
      <div className="p2">
        <Avatar online={online} userName={userName.toString()?.toUpperCase()} userId={id} />
        <span className="ms-3 text-secondary">{userName.toString()?.toUpperCase()}</span>
      </div>
    </div>
  );
}

export default Persons;
