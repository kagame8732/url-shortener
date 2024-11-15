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
      <ErrorProvider>
        <div className="">
          <ErrorDisplay />
          <RouterProvider router={router} />
        </div>
        <ToastContainer autoClose={5000} position="top-right" closeOnClick/>
      </ErrorProvider>
    </Provider>
  );
}
