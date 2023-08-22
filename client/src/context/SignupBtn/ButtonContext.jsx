import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ButtonContext = createContext();

export function ButtonProvider({ children }) {
  const [step, setStep] = useState(1)
  const [continueFlag, setContinueFlag] = useState(false);

  const handleNextStep = () => {
    setStep(step + 1);
    setContinueFlag(true)
  };
  
  const handleSkip = () => {
    setStep(step + 1)
    setContinueFlag(false)
  };

  return (
    <ButtonContext.Provider value={{ step, continueFlag, handleNextStep, handleSkip }}>
      {children}
    </ButtonContext.Provider>
  );
}

export function useButtonContext() {
  return useContext(ButtonContext);
}

ButtonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};