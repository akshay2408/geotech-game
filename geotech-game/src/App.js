import React from "react";
import Controller from "./components/Controller";
import ClientComponent from "./components/SocketTest";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Controller />
      <ClientComponent />
    </div>
  );
}

export default App;
