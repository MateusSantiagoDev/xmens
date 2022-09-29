import "./Home.css";
import { Header } from "../../components/Header/Header";
import { XMens } from "../../components/XmenList/XmenList";
import { Navbar } from "../../components/Navbar/Navbar";
import { useState } from "react";

function Home() {
  const [create, setCreate] = useState();

  return (
    <div className="Home">
      <header className="Header">
        <Header />
      </header>
      <nav>
        <Navbar createXmen={(xmen) => setCreate(xmen)} />
      </nav>
      <div className="Home__container">
        <XMens createNewXmen={create} />
      </div>
    </div>
  );
}

export { Home };
