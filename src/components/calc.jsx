const calculateEmissions = (fsn, fon, fcr, fsom, ef1) => {
    const totalN = Number(fsn) + Number(fon) + Number(fcr) + Number(fsom);
    const n2oN = totalN * Number(ef1);
    const n2o = n2oN * (44/28);
    return n2o.toFixed(2)
}

export default calculateEmissions;