# PeFi Goal Planner App
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/c1008h/pefi/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/c1008h/pefi.svg)](https://github.com/c1008h/pefi/stargazers)

![Demo](./media/PeFi.gif)

## Description
The DeFi Goal Planner App allows users to plan their financial goals over a five-year period. Users can input their financial goals, track expenses and income, and visualize their financial habits through charts and graphs.
### Features

- **Goal Planning**: Input and track financial goals for cash, digital assets, investments, and savings.
- **Expense and Income Tracking**: Log and categorize expenses and income for better financial management.
- **Data Visualization**: Visualize financial habits with charts for yearly, monthly, and weekly expenses and income.
- **Net Worth Analysis**: Monitor the growth or decrease of net worth through a line chart.

### Created with:
- **Frontend**: React with Vite
- **Backend**: Node.js with Express (MERN stack)
- **Database**: MongoDB with Mongoose
- **API**: GraphQL (Apollo Server)
- **Data Visualization**: Chart.js for charts and graphs
- **UI Library**: Material-UI (MUI) and React-Bootstrap for styling 
- **Table Component**: @tanstack/react-table for data presentation
- **Authentication**: JSON Web Tokens (JWT) with bcrypt for password hashing
  
## Table of Contents
- [PeFi Goal Planner App](#pefi-goal-planner-app)
  - [Description](#description)
    - [Features](#features)
    - [Created with:](#created-with)
  - [Table of Contents](#table-of-contents)
  - [Instructions](#instructions)
    - [Installation](#installation)
    - [Usage](#usage)
  - [Contribution](#contribution)
  - [Upcoming Features](#upcoming-features)
  - [License](#license)
  - [Contact](#contact)

## Instructions
### Installation
1. Clone the repository.
2. Install dependencies for the frontend and backend:
   ```
   npm install
   cd client && npm install
   cd ../server && npm install
### Configuration
Configure environment variables. Create a .env file in the server directory and set the following variables:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Usage
1. Register or log in to your account.
2. Input your five-year financial goals.
3. Log your expenses and income regularly.
4. Explore the charts and graphs to visualize your financial habits.
5. Monitor your net worth growth over time.
   
## Contribution
Contributions are welcome! Please create a new branch and submit a pull request for review.

## Upcoming Features

While Pefi is already packed with useful features, we're committed to continuous improvement. Here are some exciting features we're planning to add in the near future:

- **Expense Categories**: Organize your expenses with customizable categories for better tracking.
- **Mobile App**: Stay on top of your finances on the go with our upcoming mobile app.
- **Goal Achievements**: Celebrate your milestones by tracking your progress towards financial goals.
- **Dark Mode**: Enjoy Pefi's sleek interface in both light and dark modes.

We're constantly working to make Pefi even better. Keep an eye out for these enhancements in our future releases!


## License
This project is licensed under the MIT License.

## Contact
Feel free to reach out if you have any questions.

>Github: [c1008h](https://github.com/c1008h) <br>
>Email: [hongchris97@gmail.com](mailto:hongchris97@gmail.com)

