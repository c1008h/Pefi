const userResolver = require('./userResolver')
const startResolver = require('./startResolver')
const networthResolver = require('./networthResolver')
const financeResolver = require('./financeResolver')
const goalResolver = require('./goalResolver')
const deleteResolver = require('./deleteResolver')
const expenseResolver = require('./expenseResolver')
const incomeResolver = require('./incomeResolver')

module.exports = { 
    userResolver, 
    startResolver, 
    networthResolver, 
    financeResolver, 
    goalResolver,
    deleteResolver,
    expenseResolver,
    incomeResolver
}