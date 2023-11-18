export const userInformation = (userDataState) => [
    {
      label: 'First Name', name: 'firstName', type: 'text', value: userDataState.firstName, placeholder:"First name",
      isInvalid:!userDataState.firstName, validationFeedback: ""
    },
    {
      label: 'Last Name', name: 'lastName', type: 'text', value: userDataState.lastName, placeholder:"",
      isInvalid:!userDataState.lastName, validationFeedback: ""
    },
    {
      label: 'Birthday', name: 'birthday', type: 'date', value: userDataState.birthday, placeholder:"",
      isInvalid:!userDataState.birthday, validationFeedback: ""
    },
    {
      label: 'Gender', name: 'gender', type: 'text', value: userDataState.gender, placeholder:"",
      isInvalid:!userDataState.gender, validationFeedback: ""
    },
    {
      label: 'Location', name: 'location', type: 'text', value: userDataState.location, placeholder:"City, State, Country (e.g., Seattle, WA, USA)",
      isInvalid:!userDataState.location, validationFeedback: ""
    },
]

export const goalInformation = (formState) => [
    {
      label: 'Total Digital', name: 'digital', type: 'number', value: formState.digital, placeholder:"Digital",
      isInvalid:!formState.digital
    },
    {
      label: 'Total Cash', name: 'cash', type: 'number', value: formState.cash, placeholder:"Cash",
      isInvalid:!formState.cash
    },
    {
      label: 'Total Saved', name: 'saved', type: 'number', value: formState.saved, placeholder:"Invested",
      isInvalid:!formState.saved
    },
    {
      label: 'Total Invested', name: 'invested', type: 'number', value: formState.invested, placeholder:"Saved",
      isInvalid:!formState.invested
    }
]
export const currentFinancialInfo = [
    {
        label: 'Current Annual Income', name: 'incomeLevel', type: 'number', 
    },
    {
      label: 'Current Digital', name: 'currentDigital', type: 'number',
    },
    {
      label: 'Current Cash', name: 'currentCash', type: 'number',
    },
    {
      label: 'Current Saved', name: 'currentSaved', type: 'number',
    },
    {
      label: 'Current Invested', name: 'currentInvested', type: 'number', 
    }
]

export const onboardingScreenData =  (thisYear) => [
    {
        leftContent: {
            h2:"Set Your Financial Goals",
            h4:"Introduction:",
            description:[
                "Welcome to the goal-setting section! Taking the time to set clear and specific financial goals can make a significant difference in achieving your dreams. Remember, being intentional about your goals increases your chances of success. Let's get started on setting your financial goals for the upcoming year."
            ],
            orderedlist: [
                "Be Specific: Goals should be detailed and specific. Instead of general statements, define what you want to achieve in clear terms.",
                "Be Realistic: Choose goals that are challenging yet achievable based on your current financial situation.",
                "Consider Your Priorities: Align your goals with your financial priorities. What matters most to you?",
                "Break It Down: Break larger goals into smaller, manageable steps. This makes the process less overwhelming.",
                "Measure Progress: Set measurable goals so you can track your progress and celebrate achievements.",
                "Stay Flexible: Life changes, and so can your goals. Be open to adjustments if needed."
            ]
        },
        rightContent: {
            h2:"Vision for the Upcoming Year:", 
            description:[
                "In the form below, please share your financial goals for the next year. Remember to keep them specific and realistic. Don't worry about setting too many goals; even one or two well-defined goals can make a big impact."
            ]   
        }
    },
    {
        leftContent: {
            h2: "Planning for the Future",
            description: [
                `Now, let's focus on your financial goals for the upcoming year, ${thisYear}. These goals should be aligned with your long-term vision and the goals you've set for ${thisYear}. Think about specific financial achievements you'd like to reach in the next year.`
            ],
            h5: "Setting Effective Financial Goals:",
            unorderedlist: [
                `Be Specific: Clearly define what you want to achieve with your finances in ${thisYear}. The more specific, the better.`,
                "Prioritize: Consider what matters most to you financially. Are you prioritizing savings, investments, or paying off debt?",
                "Realistic Goals: Ensure your goals are challenging but achievable based on your current financial situation.",
                "Break It Down: Break larger goals into smaller, manageable steps. This makes the process less overwhelming.",
                "Measurable Goals: Set goals that you can measure, so you can track your progress."
            ]
        },
        rightContent: {
            h2: `Your Financial Goals for ${thisYear}:`,
            description: [
                `Now, let's focus on your financial goals for the upcoming year, ${thisYear}. These goals should be aligned with your long-term vision and the goals you've set for ${thisYear}. Think about specific financial achievements you'd like to reach in the next year.`
            ]
        }

    },
    {
        leftContent: {
            h2: `Your Financial Goals for ${thisYear}:`,
            description: [
                `Let's continue planning for the future. What are your financial goals for ${thisYear}? These goals can be both short-term and long-term. Be specific about what you want to achieve.`
            ],
            h5: "Tips for Setting Yearly Financial Goals:",
            unorderedlist: [
                "Review Your Progress: Reflect on the financial goals you've set for the current year. What did you achieve? What can you improve next year?",
                `New Opportunities: Think about any new financial opportunities or challenges you anticipate in ${thisYear}.`,
                "Emergency Fund: Consider allocating a portion of your financial goals to building or replenishing your emergency fund.",
                "Diversify Goals: Don&rsquo;t put all your financial goals into one basket. Diversify your goals across savings, investments, and debt reduction."
            ]
        },
        rightContent: {
            h2: `Your Financial Goals for ${thisYear}`,
            description: [
                `Let's continue planning for the future. What are your financial goals for ${thisYear}? These goals can be both short-term and long-term. Be specific about what you want to achieve.`
            ]
        }
    },
    {
        leftContent: {
            h2: `Your Financial Goals for ${thisYear}:`,
            description: [
                `What do you envision for your finances in ${thisYear + 1}? This is an opportunity to set ambitious goals. Consider what you can achieve over the next few years.`
            ],
            h5: "Planning for Longer-Term Financial Success:",
            unorderedlist: [
                `Long-Term Goals: In addition to ${thisYear}, think about your financial goals for the next few years. Where do you want to be financially?`,
                "Retirement Planning: If you haven&rsquo;t already, consider setting long-term retirement savings goals.",
                "Budget Adjustments: Are there any adjustments you need to make to your budget to achieve your longer-term goals?",
                "Professional Advice: If necessary, consult with a financial advisor to help you plan for the long term."
            ]
        }, 
        rightContent: {
            h2: `Your Financial Goals for ${thisYear}:`,
            description: [
                `What do you envision for your finances in ${thisYear + 1}? This
                is an opportunity to set ambitious goals. Consider what you can
                achieve over the next few years.`
            ]
        }
    },
    {
        leftContent: {
            h2: `Your Financial Goals for ${thisYear}:`,
            description: [
                `As we look even further ahead, what are your financial dreams for ${thisYear + 1}? This is your chance to set long-term goals and plan for the future.`
            ],
            h5: "Setting Long-Term Financial Goals:",
            unorderedlist: [
                "Life Milestones: Think about major life milestones you anticipate in the coming years, such as buying a home, starting a family, or pursuing advanced education.",
                "Investment Strategies: Consider long-term investment strategies that align with your goals.",
                "Emergency Preparedness: Continue building your emergency fund to provide financial security for unexpected events.",
                "Estate Planning: If applicable, start thinking about estate planning and how your financial goals fit into your overall legacy."
            ]
        },
        rightContent: {
            h2: `Your Financial Goals for ${thisYear}:`,
            description: [
                `As we look even further ahead, what are your financial dreams
                for ${thisYear + 1}? This is your chance to set long-term goals
                and plan for the future.`
            ]
        }
    }
]

export const financialScreenData = [
    {
        leftContent: {
            h2: "Why We Need Your Financial Information",
            description: [
                "To provide you with the best financial advice and tools, we need some information about your current financial situation. Rest assured, your data is kept secure and confidential. Here's why we need this information:"
            ],
            unorderedlist: [
                `<strong>Income Level:</strong> Your income level helps us understand your financial capacity and plan accordingly.`,
                "<strong>Cash in Bank:</strong> Information about your cash in the bank helps us assess your available liquidity and budgeting options.",
                "<strong>Invested Assets:</strong> Details about your invested assets allow us to provide insights into your investment portfolio and strategies.",
                "<strong>Savings Accounts:</strong> Knowing about your savings accounts assists us in managing your savings goals and optimizing your returns.",
                "<strong>Cash on Hand:</strong> Your literal cash holdings are important for budgeting and financial planning, including day-to-day expenses."
            ]

        },
        rightContent: {
            h2: "Current Finances",
            description: [
                "Providing this information will enable us to offer personalized financial guidance tailored to your unique situation. Your financial data is encrypted and secure, and we are committed to protecting your privacy."
            ]
        },
        bottomContent: {
            description: "Please fill out all the form fields before you can continue."
        }
    }
]