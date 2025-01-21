import promisePool from "./../config/db.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class BookingControllers {
  addBooking = async (req, res) => {
    const { nombre, apellidos, correo, telefono, formacionId, plazas, tallas } =
      req.body; // Datos del cliente y reserva

    // Validar que todos los campos estén presentes
    if (
      !nombre ||
      !apellidos ||
      !correo ||
      !formacionId ||
      !plazas ||
      !tallas
    ) {
      return res.status(400).json({
        message:
          "Todos los campos son requeridos: nombre, apellidos, correo, formacionId, plazas, tallas",
      });
    }

    try {
      // Validar que la formación exista
      const [formacionResult] = await promisePool.query(
        "SELECT * FROM formaciones WHERE formacion_id = ?",
        [formacionId]
      );

      if (formacionResult.length === 0) {
        return res.status(404).json({ message: "Formación no encontrada" });
      }

      // Si la formación existe, insertamos la reserva
      const reservaQuery =
        "INSERT INTO reservas (nombre, apellidos, correo, telefono, numero_plazas, talla_camisetas, formacion_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const reservaValues = [
        nombre,
        apellidos,
        correo,
        telefono,
        plazas,
        tallas,
        formacionId,
      ];

      const [reservaResult] = await promisePool.query(
        reservaQuery,
        reservaValues
      );

      // Devolvemos la ID de la reserva creada
      res.status(201).json({
        message: "Reserva creada exitosamente",
        reservaId: reservaResult.insertId,
      });
    } catch (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ message: "Error al realizar la reserva" });
    }
  };

  // Crear una sesión de pago
  createPaymentSession = async (req, res) => {
    const { nombre, apellidos, correo, formacionId, plazas, totalAmount } =
      req.body;

    try {
      // Validar los datos requeridos
      if (!formacionId || !plazas || !totalAmount) {
        return res
          .status(400)
          .json({ message: "Datos insuficientes para procesar el pago" });
      }

      // Crear una sesión de pago en Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Métodos de pago aceptados
        mode: "payment", // Modo de pago único
        customer_email: correo,
        line_items: [
          {
            price_data: {
              currency: "eur", // Cambia según tu moneda
              product_data: {
                name: `Formación ${formacionId}`,
                description: `Reserva de ${plazas} plazas para la formación`,
              },
              unit_amount: Math.round(totalAmount * 100), // Stripe maneja los precios en centavos
            },
            quantity: 1, // Cantidad única
          },
        ],
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });

      res.status(200).json({ url: session.url });
    } catch (err) {
      console.error('Error al crear la sesión de pago:', err);
      res.status(500).json({ message: "Error al procesar el pago" });
    }
  };
}

export default new BookingControllers();
