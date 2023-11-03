import ModalBody from 'react-bootstrap/esm/ModalBody';
import './RafidTempStyle.css'
import { useState } from 'react';
import axios from 'axios';
import { Weather,createId } from './WardrbeBackend';
import { GenerateOutfit } from './example';

function OutfitPage(){
    const [outfit,setOufit] = useState(null);

    const localWeather = new Weather(11369);
    const userId = new createId(27496);
    async function handleClick(){
        console.log(localWeather);
    }

    return(
    <div align="center">
        <h2>Outfits</h2>
        <button onClick={handleClick}>Generate Outfit!</button>
    </div>
    )
}

export default OutfitPage;