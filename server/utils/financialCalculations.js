function calculateNetworth(digital, cash, invested, saved) {
    const networth = digital + cash + invested + saved

    return networth
}

module.exports = { calculateNetworth }