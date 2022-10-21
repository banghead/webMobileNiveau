import './App.css';
import {Button} from "@mui/material";
import Welcome from "../Welcome/Welcome";

function App() {
    const element = <div><Welcome name="Sara" /> <Welcome name="Leon" /></div>;
  return (
      <div>
        {element}
        <Button variant="contained">Hello World</Button>
      </div>
  );
}

export default App;
