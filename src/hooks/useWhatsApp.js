export const useWhatsApp = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '611875588'; 
    const message = 'Hola Pipo, estoy tieso. Ayuda'; 
    const encodedMessage = encodeURIComponent(message);  
    window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
  };

  return { handleWhatsAppClick };
};
