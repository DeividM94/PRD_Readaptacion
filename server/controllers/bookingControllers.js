import connection from './../config/db.js';

class BookingControllers {
  addBooking = (req, res) => {
    console.log(req.body);
    const { cliente_id, formacion_id, plazas } = req.body;
    
    // Validar que todos los campos estén presentes
    if (!cliente_id || !formacion_id || !plazas) {
      return res.status(400).json({ message: 'Todos los campos son requeridos: cliente_id, formacion_id, plazas' });
    }

    // Consulta SQL para insertar la reserva
    const query = 'INSERT INTO reservas (cliente_id, formacion_id, plazas) VALUES (?, ?, ?)';
    const values = [cliente_id, formacion_id, plazas];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error al insertar la reserva:', err);
        return res.status(500).json({ message: 'Error al guardar la reserva en la base de datos' });
      }

      res.status(201).json({ message: 'Reserva creada exitosamente', id: result.insertId });
    });
  };
}

export default new BookingControllers();