import { BookStoreThemeProvider } from "./context/themeContext";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";
import { router } from "./router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        <RouterProvider router={router} />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
