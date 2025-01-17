import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ErrorProvider } from "./context/ErrorContext";
import ErrorDisplay from "./context/ErrorDisplay";
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Provider store={store}>
{/* For managing errors globally */}
      <ErrorProvider> 
        <div className="">
{/* For display catched error */}
          <ErrorDisplay />
{/* Used for navigation in different pages */}
          <RouterProvider router={router} />
        </div>
{/* Display the message */}
        <ToastContainer autoClose={5000} position="top-right" closeOnClick/>
      </ErrorProvider>
    </Provider>
  );
}
