import { BookStoreThemeProvider } from "./context/themeContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <BookStoreThemeProvider>
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;
