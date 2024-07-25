import { BookStoreThemeProvider } from "./context/themeContext";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";
import { router } from "./router";
import ToastContainer from "./components/common/toast/ToastContainer";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
