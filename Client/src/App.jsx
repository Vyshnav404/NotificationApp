import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import { posts } from "/data";
import { io } from "socket.io-client";

function App() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  console.log("i am in outside");
  useEffect(() => {
    try {
      console.log("where are here in above localhost");
      setSocket(io("http://localhost:3000"));
      console.log("where are here in below localhost");
    } catch (error) {
      console.log("Error under localhost", error);
    }
  }, []);

  console.log("socket", socket);
  useEffect(() => {
    if(socket){
    try {
      socket?.emit("newUser", user);
    } catch (error) {
      console.log("Error in newUser event", error);
    }
  }
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
        <>
          {" "}
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="user_Name">{user}</span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="UserName"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={() => setUser(userName)}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
