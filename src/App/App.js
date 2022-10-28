import {useState} from "react";

function App(){
    //state(état ou données)
    const [compteur, setCompteur] = useState(1);


    //comportement
    const handleClick = () => {
        setCompteur(compteur + 1 );
    }


    //render
    return <div>
        <h1>bonjour Flo {compteur}</h1>
        <button onClick={handleClick}>incre</button>
    </div>
}

export default App;
