const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const {
    userTypeDefs,
    startTypeDefs,
    networthTypeDefs,
    incomeTypeDefs,
    goalTypeDefs,
    financeTypeDefs,
    expenseTypeDefs
} = require('./typeDefs');
const {
    userResolver, 
    startResolver, 
    networthResolver, 
    financeResolver, 
    goalResolver,
    deleteResolver,
    expenseResolver,
    incomeResolver
} = require('./resolvers')

const typeDefs = mergeTypeDefs([
    userTypeDefs,
    startTypeDefs,
    networthTypeDefs,
    incomeTypeDefs,
    goalTypeDefs,
    financeTypeDefs,
    expenseTypeDefs,
]);

const resolvers = mergeResolvers([
    userResolver, 
    startResolver, 
    networthResolver, 
    financeResolver, 
    goalResolver,
    deleteResolver,
    expenseResolver,
    incomeResolver
])

module.exports = { typeDefs, resolvers };
