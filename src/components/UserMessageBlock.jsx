import React from "react";

const UserMessageBlock = ({ text }) => {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
        <div
          style={{
            width: 25,
            height: 25,
            borderRadius: "50%",
            backgroundColor: "black",
          }}
        />
        <p style={{ fontWeight: "bold" }}>You</p>
      </div>
      <div style={{ marginLeft: 35 }}>{text}</div>
    </div>
  );
};

export default UserMessageBlock;
