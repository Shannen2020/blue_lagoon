import React, { useState, useEffect } from "react";
import calculateEmissions from "./calc";

const Dropdown = () => {

    const [name,setName] = useState("")
    const [fsn, setFsn] = useState("")
    const [fon, setFon] = useState("")
    const [fcr, setFcr] = useState("0")
    const [fsom, setFsom] = useState("0")
    const [ef1, setEf1] = useState("0.01")
    const[result, setResult] = useState(null)
    const[history, setHistory] = useState([])
    const [errors, setErrors] = useState({})
    const [ef4, setEf4] = useState("0.010")
    const [ef5, setEf5] = useState("0.011")
    const [fracGASF, setFracGASF] = useState("0.11")
    const [fracLEACH, setFracLEACH] = useState("0.24")
    const [method, setMethod] = useState("aggregated")
    const [fertilizerType, setFertilizerType] = useState("synthetic")

    const handleCalculate = () => {
        const newErrors = {};
        if (isNaN(fsn) || fsn==='') newErrors.fsn = 'Valid number only!'
        if (isNaN(fon) || fon==='') newErrors.fon = 'Valid number only!'
        if (isNaN(fcr) || fcr==='') newErrors.fcr = 'Valid number only!'
        if (isNaN(fsom) || fsom==='') newErrors.fsom = 'Valid number only!'
        if (isNaN(ef1) || ef1==='') newErrors.ef1 = 'Valid number only!'
        if (isNaN(ef4) || ef4==='') newErrors.ef4 = 'Valid number only!'
        if (isNaN(ef5) || ef5==='') newErrors.ef5 = 'Valid number only!'
        if (isNaN(fracGASF) || fracGASF==='') newErrors.fracGASF = 'Valid number only!'
        if (isNaN(fracLEACH) || fracLEACH==='') newErrors.fracLEACH = 'Valid number only!'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
          }
        
          setErrors({});


        const value = calculateEmissions(fsn, fon, fcr, fsom, ef1, ef4, ef5, fracGASF, fracLEACH)
        setResult(value)

        const newEntry = {
            name, fsn, fon, fcr, fsom, ef1, ef4, ef5, 
            fracGASF, fracLEACH, method, fertilizerType, 
            result: value
        };
        setHistory(prev => [newEntry, ...prev.slice(0, 2)])
    }


    const handleReset = () => {
        setName("")
        setFsn("")
        setFon("")
        setFcr("0")
        setFsom("0")
        setEf1("0.01")
        setResult(null)
        setErrors({})
    }

    const handleExport = () => {
        const csv = [
          ["Name", "Synthetic N", "Organic N", "Crop Residue N", 
            "Soil Mineralized N", "EF1", "Fertilizer Type", "Result (kg N2O)"]
            .join(","),
          ...history.map(row => [row.name, row.fsn, row.fon, 
            row.fcr, row.fsom, row.ef1, 
            row.fertilizerType, row.result].join(","))
        ].join("\n");
    
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "emissions_history.csv";
        a.click();
      };

    useEffect(() => {
        if (method === "aggregated") {
            setEf4("0.010");
            setEf5("0.011");
            setFracLEACH("0.24");
            setFracGASF(fertilizerType === "organic" ? "0.21" : "0.11");
        } else {
            // let user pick via dropdowns or leave it as-is
            setEf4("");
            setEf5("");
            setFracLEACH("0");
            setFracGASF("0");
        }
        }, [method, fertilizerType]);

    return (
        <div className="content-wrapper">
            <div className="container">
                <div className="col input-panel">               
                <h1 className = 'title'>Fertilizer Emissions Calculator</h1>
                    
                    <label className = 'input-params'>Name of Fertilizer</label>   
                    <input
                    type = 'text'
                    placeholder=''
                    value={name}
                    onChange={(event)=>
                        setName(event.target.value)}
                    />

                    <label className = 'input-params'>Weight of N₂0 in Synthetic Fertilizer (kg/year) </label>   
                    <input
                    type = 'text'
                    placeholder= ''
                    value={fsn}
                    onChange={(event)=>
                    setFsn(event.target.value)}
                    />
                    {errors.fsn && <p className="error-message">{errors.fsn}</p>}

                    <label className = 'input-params'>Weight of N₂0 in Organic Fertilizer (kg/year)</label>
                    <input
                    type="text"
                    placeholder= ''
                    value={fon}
                    onChange={(event)=> setFon(event.target.value)}
                    />
                    {errors.fon && <p className="error-message">{errors.fon}</p>}

                    <label className = 'input-params'>Weight of N₂0 in Crop Residue (kg/year)</label>
                    <input
                    type='text'
                    placeholder=''
                    value={fcr}
                    onChange={(event)=>setFcr(event.target.value)}
                    />
                    {errors.fcr && <p className="error-message">{errors.fcr}</p>}

                    <label className = 'input-params'>Weight of N₂0 in Mineralized Soil (kg/year)</label>
                    <input
                    type='text'
                    placeholder=''
                    value={fsom}
                    onChange={(event)=>setFsom(event.target.value)}
                    />
                    {errors.fsom && <p className="error-message">{errors.fsom}</p>}
                    </div>
                <div className="reference-link">
                    <a href="https://www.ipcc-nggip.iges.or.jp/public/2019rf/pdf/4_Volume4/19R_V4_Ch11_Soils_N2O_CO2.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    📘 I'm lost! Bring me to IPCC Documentation
                    </a>
                </div>
                </div>
            <div className="container">
                <h1 className="title">IPCC Default Factors</h1>
                <div className="dropdown-row">
                    <div className="dropdown-item">
                        <label className="input-params">Emission Factor Type</label>
                        <select value={method} onChange={(e) => setMethod(e.target.value)}>
                            <option value = 'aggregated'>Aggregated</option>
                            <option value = 'disaggregated'>Disaggregated</option>
                        </select>
                    </div>
                    <div className="dropdown-item">
                        {method === "aggregated" && (
                            <>
                            <label className="input-params">Fertilizer Type</label>
                            <select value={fertilizerType} onChange={(e) => setFertilizerType(e.target.value)}>
                                <option value="synthetic">Synthetic</option>
                                <option value="organic">Organic</option>
                                </select>
                            </>
                        )}
                    </div>
                </div>
                <div className="col input-panel">
                    <label className = 'input-params'>Emission Factor (EF₁)</label>
                    <input
                    type='text'
                    placeholder='0.001'
                    value={ef1}
                    onChange={(event)=>setEf1(event.target.value)}
                    />
                    {errors.ef1 && <p className="error-message">{errors.ef1}</p>}

                    <label className = 'input-params'>Emission Factor (EF₄)</label>
                    <input
                    type='text'
                    value={ef4}
                    onChange={(event)=>setEf4(event.target.value)}
                    readOnly={method === 'aggregated'}
                    />
                    {errors.ef4 && <p className="error-message">{errors.ef4}</p>}

                    <label className = 'input-params'>Emission Factor (EF₅)</label>
                    <input
                    type='text'
                    value={ef5}
                    onChange={(event)=>setEf5(event.target.value)}
                    readOnly={method === 'aggregated'}
                    />
                    {errors.ef5 && <p className="error-message">{errors.ef5}</p>}

                    <label className = 'input-params'>Volatilisation Factor (FracGAS)</label>
                    <input
                    type='text'
                    value={fracGASF}
                    onChange={(event)=>setFracGASF(event.target.value)}
                    readOnly={method === 'aggregated'}
                    />
                    {errors.fracGASF && <p className="error-message">{errors.fracGASF}</p>}

                    <label className = 'input-params'>Leaching Factor (FracLEACH)</label>
                    <input
                    type='text'
                    value={fracLEACH}
                    onChange={(event)=>setFracLEACH(event.target.value)}
                    readOnly={method === 'aggregated'}
                    />
                    {errors.fracLEACH && <p className="error-message">{errors.fracLEACH}</p>}

                    <div className="button-row">
                        <button className="calcButton" onClick={handleCalculate}>Calculate</button>
                        <button className="resetButton"onClick={handleReset}>Reset</button>
                    </div>
                </div>
            </div>
            <div className="col output-panel">
                <div className="result-side">
                    <div className="result-card">
                        <h2 className="subtitle">Total N₂O emissions for {name}:</h2>
                        <div className='result-icon'>🌱</div>
                        {result && (
                            <>
                                <p><strong>{result}</strong> kg N₂O/year</p>
                                <p className="result-note">
                                    Based on your input values, this is the estimated direct N₂O emission.
                                </p>
                                </>
                            )}  
                    </div>
                    {history.length > 0 && (
                        <div className="history-section">
                            <h3 className="subtitle">Last 3 Calculations</h3>
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>N in Synthetic Fertilizer (kg/year)</th>
                                        <th>N in Organic Fertilizer(kg/year)</th>
                                        <th>N in Crop Residue(kg/year)</th>
                                        <th>N in Mineralized Soil (kg/year)</th>
                                        {/* <th>EF₁</th>
                                        <th>EF₄</th>
                                        <th>EF₅</th>
                                        <th>FracGAS</th>
                                        <th>FracLEACH</th> */}
                                        <th>Fertilizer Type</th> 
                                        <th>Result (kg N₂O/year)</th>
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
                                        {/* <td>{row.ef1}</td>
                                        <td>{row.ef4}</td>
                                        <td>{row.ef5}</td>
                                        <td>{row.fracGASF}</td>
                                        <td>{row.fracLEACH}</td> */}
                                        <td>{row.fertilizerType}</td> 
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
        </div>
    );
};
export default Dropdown
