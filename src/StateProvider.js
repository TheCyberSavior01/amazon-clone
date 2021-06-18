import React, { createContext, useContext, useReducer } from "react";

//Prepares the data layer
export const StateContext = createContext();

// Wrap the main app and provide access to the data layer
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
