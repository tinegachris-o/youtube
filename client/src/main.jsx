import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import  {Provider } from "react-redux"
import {persistor, store} from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Your App component */}{" "}
      {/* Wrap your app with the Provider component and pass the Redux store */}{" "}
      {/* Make sure to import the Provider and the store from the respective files */}{" "}
      {/* Wrap your app with the Provider component and pass the Redux store */}{" "}
      {/* Make sure to import the Provider and the store from the respective files */}{" "}
      {/* Wrap your app with the Provider component and pass the Redux store */}{" "}
      {/* Make sure to import the Provider and the sto
      re from the respective files */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
