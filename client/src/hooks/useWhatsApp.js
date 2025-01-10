export const useWhatsApp = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '611875588'; 
    const message = 'Hola me gustaría solicitar información'; 
    const encodedMessage = encodeURIComponent(message);  
    window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
  };

  return { handleWhatsAppClick };
};
