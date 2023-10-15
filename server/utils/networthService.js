const cron = require('node-cron');
const { User, Networth } = require('../models/index'); 

const createMonthlyNetworth = async () => {
    // Logic to calculate monthly net worth and year/month
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1; // Months are zero-based, so add 1 to get the actual month.
  
    // Retrieve the current YearlyNetworth document for the year
    let yearlyNetworth = await Networth.findOne({ year: year });
  
    // If it doesn't exist, create a new one
    if (!yearlyNetworth) {
        yearlyNetworth = new Networth({
        year: year,
        monthlyData: [],
      });
    }

    if (!yearlyNetworth.monthlyData || !Array.isArray(yearlyNetworth.monthlyData)) {
        yearlyNetworth.monthlyData = [];
    }
    
    let monthlyNetworth = yearlyNetworth.monthlyData.find((entry) => entry.month === month);

    if (!monthlyNetworth) {
        monthlyNetworth = {
            month: month,
            digital: 0, // Replace with your logic
            cash: 0, // Replace with your logic
            invested: 0, // Replace with your logic
            saved: 0, // Replace with your logic
        }
        yearlyNetworth.monthlyData.push(monthlyNetworth);
    }
  
    // Save the YearlyNetworth document with updated data
    await yearlyNetworth.save();

    // Find all users who need to be updated
    const users = await User.find();

    // Update each user's net worth group with the new YearlyNetworth document
    for (const user of users) {
    // Check if the YearlyNetworth document already exists in the user's net worth group
        const existingRef = user.networthGroup.find((ref) => ref.equals(yearlyNetworth._id));
        if (!existingRef) {
            // Add the reference to the YearlyNetworth document
            user.networthGroup.push(yearlyNetworth);
            await user.save();
        }
    }
};

cron.schedule('0 0 1 * *', createMonthlyNetworth);


module.exports = { createMonthlyNetworth };
