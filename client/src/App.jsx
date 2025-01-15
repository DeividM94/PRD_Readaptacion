import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AppRoutes } from "./Routes/AppRoutes";
import { CartProvider } from "./context/CartContext";


function App() {
  return (
    <CartProvider> 
      <AppRoutes />
    </CartProvider>
  );
}

export default App;