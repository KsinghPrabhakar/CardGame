import React, { useState } from 'react'
import Data from "../Data"
const GifDropdown = () => {
    const [gif, setGif] = useState('')
    const onChangeHandler = (e) => {
        const selecteId = Data[e.target.value - 1];
        setGif(selecteId)
        // console.log(selecteId);
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label style={{ fontSize: 20, fontFamily: 'fantasy' }}>Chose Your Cruse in these options</label>
            <select style={{ width: 300, height: 40, fontSize: 30, margin: 10 }} onChange={(e) => onChangeHandler(e)}>
                {Data.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
            </select>
            <div style={{ borderColor: 'gold', border: 5 }}>
                {gif ? (<img src={gif?.image} alt={gif?.name} height='600px' width='600px' />) : null}
            </div>
        </div>
    )
}
export default GifDropdown
