import connection from "../config/db.js";

class TrainingControllers {
  getTraining = (req, res) => {
    const query = 'SELECT * FROM formaciones'; 

    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener formaciones:', err);
        res.status(500).send('Error interno del servidor');
      } else {
        console.log(results);
        
        res.json(results);
      }
    });
  }
}

export default new TrainingControllers();