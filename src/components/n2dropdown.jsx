import React, { useState } from "react";
import calculateEmissions from "./calc";

const Dropdown = () => {
    const [name,setName] = useState("")
    const [fsn, setFsn] = useState("")
    const [fon, setFon] = useState("")
    const [fcr, setFcr] = useState("")
    const [fsom, setFsom] = useState("")
    const [ef1, setEf1] = useState(0.01)
    const[result, setResult] = useState(null)
    const[history, setHistory] = useState([])

    const handleCalculate = () => {
        const value = calculateEmissions(fsn, fon, fcr, fsom, ef1)
        setResult(value)

        const newEntry = {
            name, fsn, fon, fcr, fsom, ef1, result: value
        };
        setHistory(prev => [newEntry, ...prev.slice(0, 2)])
    }

    const handleReset = () => {
        setName("")
        setFsn("")
        setFon("")
        setFcr("")
        setFsom("")
        setEf1(0.01)
        setResult(null)
    }

    const handleExport = () => {
        const csv = [
          ["Name", "Synthetic N", "Organic N", "Crop Residue N", "Soil Mineralized N", "EF1", "Result (kg N2O)"]
            .join(","),
          ...history.map(row => [row.name, row.fsn, row.fon, row.fcr, row.fsom, row.ef1, row.result].join(","))
        ].join("\n");
    
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "emissions_history.csv";
        a.click();
      };

    return (
        <div className="content-wrapper">
            <div className="container">
                <h1 className = 'title'>Fertilizer Emissions Calculator</h1>
                <div className = 'input-group-vertical'>

                <label className = 'input-params'> Name of Fertilizer</label>   
                <input
                type = 'text'
                placeholder=''
                value={name}
                onChange={(event)=>
                    setName(event.target.value)}
                />

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
                <div className="button-row">
                    <button className="calcButton" onClick={handleCalculate}>Calculate</button>
                    <button className="resetButton"onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
        <div className="result-side">
            {result && (
                <div className="result-card">
                    <div className='result-icon'>🌱</div>
                    <h2 className="subtitle">Total N₂O emissions for {name}:</h2>
                    <p><strong>{result}</strong> kg N₂O/year</p>
                    <p className="result-note">
                        Based on your input values, this is the estimated direct N₂O emission.
                    </p>
                </div>
            )}

            {history.length > 0 && (
                <div className="history-section">
                    <h3 className="subtitle">Last 3 Calculations</h3>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Name</th><th>Synthetic N</th><th>Organic N</th><th>Crop Residue</th><th>Soil N</th><th>EF₁</th><th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.name}</td>
                                <td>{row.fsn}</td>
                                <td>{row.fon}</td>
                                <td>{row.fcr}</td>
                                <td>{row.fsom}</td>
                                <td>{row.ef1}</td>
                                <td><strong>{row.result}</strong></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="history-actions">
                        <button onClick={() => setHistory([])} className="clear-table">Clear Table</button>
                        <button onClick={handleExport} className="export-table">Export CSV</button>
                        
                    </div>
                </div>
            )}
        </div>
            </div>
    );
};
export default Dropdown
