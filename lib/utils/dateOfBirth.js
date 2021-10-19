function calculateAge(dob) { 
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs); 
  
    return Math.abs(ageDt.getUTCFullYear() - 1970);
}

console.log(calculateAge(new Date(1982, 11, 4)));

module.exports = calculateAge;