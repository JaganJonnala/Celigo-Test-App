import React from "react";
import { useContext } from "react";
import AppContext from "./context";

export default function SignIn() {
  const myContext = useContext(AppContext);

  const handleAuth = (e) => {
    console.log("ddasf", e.target.checked);
    myContext.updateAuth(e.target.checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={myContext.isAuthenticated}
        onChange={(e) => handleAuth(e)}
      />{" "}
      I'm Authenticated
    </div>
  );
}
