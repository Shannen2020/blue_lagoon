const calculateDirect = (fsn, fon, fcr, fsom, ef1) => {
    const totalN = Number(fsn) + Number(fon) + Number(fcr) + Number(fsom);
    const n2oN = totalN * Number(ef1);
    const n2o = n2oN * (44/28);
    return n2o
}

// Equation 11.11 //
// table 11.3 IPCC //
const calculateIndirectEmssionVol = (fsn, fracGASF = 0.11, ef4)=> {
    const n2oVolatilisation = Number(fsn) * Number(fracGASF) * Number(ef4)
    return n2oVolatilisation
}

const calculateIndirectEmssionLeach = (fsn, fracLEACH =  0.24, ef5)=> {
    const n2oLeaching = Number(fsn) * Number(fracLEACH) * Number(ef5)
    return n2oLeaching
}

const calculateEmissions = (fsn, fon, fcr, fsom, ef1, ef4, ef5, fracGASF, fracLEACH)=> {
    const direct = calculateDirect(fsn, fon, fcr, fsom, ef1)
    const indirectVol = calculateIndirectEmssionVol(fsn, fracGASF,ef4)
    const indirectLeach = calculateIndirectEmssionLeach(fsn, fracLEACH, ef5)

    const total = direct + indirectVol + indirectLeach
    return total.toFixed(2)

}

export default calculateEmissions;