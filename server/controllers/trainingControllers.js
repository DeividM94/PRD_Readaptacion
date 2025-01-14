import promisePool from './../config/db.js';

class TrainingControllers {
  getTraining = async (req, res) => {
    const query = 'SELECT * FROM formaciones';

    try {
      const [results] = await promisePool.query(query);  
      res.json(results);
    } catch (err) {
      console.error('Error al obtener formaciones:', err);
      res.status(500).send('Error interno del servidor');
    }
  };

 
  getOneTraining = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM formaciones WHERE id = ?';

    try {
      const [results] = await promisePool.query(query, [id]);
      if (results.length === 0) {
        return res.status(404).json({ message: 'Formación no encontrada' });
      }
      res.json(results[0]);
    } catch (err) {
      console.error('Error al obtener la formación:', err);
      res.status(500).send('Error interno del servidor');
    }
  };
}

export default new TrainingControllers();
