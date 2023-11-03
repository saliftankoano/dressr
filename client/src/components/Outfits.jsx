import ModalBody from 'react-bootstrap/esm/ModalBody';
import './RafidTempStyle.css'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import axios from 'axios';

function OutfitPage(){
    async function handleClick(){
        const outfit = await axios.post('http://localhost:4000/api/wardrobe/generate-outfit')
        return(
            <div>
                {outfit}
            </div>
        )
    }

    return(
    <div align="center">
        <h2>Outfits</h2>
        <button onClick={handleClick}>Generate Outfit!</button>
    </div>
    )
}

export default OutfitPage;