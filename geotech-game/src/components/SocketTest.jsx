import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ENDPOINT } from "../Utils";

export default function ClientComponent() {
  const [response, setResponse] = useState("");
  let socket;
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data.response);
    });
    return () => socket.close();
  }, []);

  return (
    <p>
      Hey{" "}
      <span className={response ? "connected" : "disconnected"}>
        {response ? "Socket Connected" : "Disconnected"}
      </span>
    </p>
  );
}
