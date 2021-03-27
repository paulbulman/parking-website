import sign from "./roadworks-sign.jpg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Temporarily unavailable</h1>
      <p>The parking rota app is currently offline for maintenance.</p>
      <p>
        <img src={sign} alt="Roadworks sign" />
      </p>
    </div>
  );
}

export default App;
