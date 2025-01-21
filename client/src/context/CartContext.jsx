import React, { createContext, useState, useEffect } from "react";

// Creamos el contexto para el carrito
export const CartContext = createContext();

// Componente proveedor del carrito
export const CartProvider = ({ children }) => {
  // Estado para almacenar los productos en el carrito
  const [cart, setCart] = useState([]);

  // Cargar el carrito desde localStorage al montar el componente
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  
  // Actualizar el carrito y guardarlo en localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Agregar un producto al carrito o actualizar las plazas si ya existe
  const addToCart = (item, plazas) => {
  const updatedCart = [{ ...item, plazas }]; // Reemplazar el carrito con el nuevo ítem

  // Actualizar el carrito en el estado y en localStorage
  updateCart(updatedCart);
};
  
  // Eliminar un producto del carrito
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  // Actualizar la cantidad de plazas de un producto en el carrito
  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, plazas: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  // Proveer el carrito y las funciones de actualización a los componentes hijos
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
