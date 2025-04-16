import React, { useState } from "react";
import calculateEmissions from "./calc";

const Dropdown = () => {
    const [fsn, setFsn] = useState("")
    const [fon, setFon] = useState("")
    const [fcr, setFcr] = useState("")
    const [fsom, setFsom] = useState("")
    const [ef1, setEf1] = useState(0.01)
    const[result, setResult] = useState(null)

    const handleCalculate = () => {
        const value = calculateEmissions(fsn, fon, fcr, fsom, ef1)
        setResult(value)
    }

    return (
        <div className="content-wrapper">
            <div className="container">
                <h1 className = 'title'>Fertilizer Emissions Calculator</h1>
                <div className = 'input-group-vertical'>
                <label className = 'input-params'>Synthetic Fertilizer N (kg/year) </label>   
                <input
                type = 'number'
                placeholder='Key in a number'
                value={fsn}
                onChange={(event)=>
                    setFsn(event.target.value)}
                />

                <label className = 'input-params'>Organic Fertilizer N (kg/year)</label>
                <input
                type="number"
                placeholder='Key in a number'
                value={fon}
                onChange={(event)=> setFon(event.target.value)}
                />

                <label className = 'input-params'>Crop Residue N (kg/year)</label>
                <input
                type='number'
                placeholder='Key in a number'
                value={fcr}
                onChange={(event)=>setFcr(event.target.value)}
                />

                <label className = 'input-params'>Mineralized Soil N (kg/year)</label>
                <input
                type='number'
                placeholder='Key in a number'
                value={fsom}
                onChange={(event)=>setFsom(event.target.value)}
                />

                <label className = 'input-params'>Emission Factor (EF₁)</label>
                <input
                type='number'
                placeholder='0.001'
                value={ef1}
                onChange={(event)=>setEf1(event.target.value)}
                />

                <button onClick={handleCalculate}>Calculate</button>
            </div>
        </div>
                {result && (
                    <div className="result-card">
                        <div style={{ fontSize: "32px", marginBottom: "10px" }}>🌱</div>
                        <h2 className="subtitle">Total N₂O Emissions:</h2>
                        <p><strong>{result}</strong> kg N₂O/year</p>
                        <p style={{ fontSize: "13px", marginTop: "10px", color: "#555" }}>
                            Based on your input values, this is the estimated direct N₂O emission.
                        </p>
                    </div>
                )}
            </div>
    );
};
export default Dropdown