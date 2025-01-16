import connection from "./../config/db.js";

class BookingControllers {
  addBooking = (req, res) => {
  //   console.log(req.body);
  //   const { nombre, email, telefono, formacionId, plazas } = req.body; // Datos del cliente y reserva

  //   // Validar que todos los campos estén presentes
  //   if (!nombre || !email || !telefono || !formacionId || !plazas) {
  //     return res.status(400).json({message:"Todos los campos son requeridos: nombre, email, telefono, formacion_id, plazas"});
  //   }
  //   // Consulta SQL para insertar la reserva en la tabla 'reservas'
  //   const query =
  //     "INSERT INTO reservas (cliente_id, formacion_id, plazas, confirmada) VALUES (?, ?, ?, ?)";
  //   const values = [cliente_id, formacionId, plazas, false]; // Inicialmente no confirmada

  //   connection.query(query, values, (err, result) => {
  //     if (err) {
  //       console.error("Error al insertar la reserva:", err);
  //       return res
  //         .status(500)
  //         .json({ message: "Error al guardar la reserva en la base de datos" });
  //     }

  //     // Devolvemos la ID de la reserva creada
  //     res
  //       .status(201)
  //       .json({ message: "Reserva creada exitosamente", id: result.insertId });
  //   });
  // };
}
}

export default new BookingControllers();
