import { PlaidLink } from 'react-plaid-link';

const PlaidLinkComponent = ({ onLinkSuccess }) => {
  return (
    <PlaidLink
      token="your_link_token" // Replace with the Link token obtained from your server
      onSuccess={(publicToken, metadata) => {
        // Handle successful Plaid Link
        onLinkSuccess(publicToken, metadata);
      }}
      onExit={() => {
        // Handle when the user exits Plaid Link
      }}
    >
      Link Your Bank Account
    </PlaidLink>
  )
}