import { sequelize } from '../config';
import app from '../api/app';

const port = process.env.port || 8080;

sequelize
  .sync()
  .then(() =>
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    })
  )
  .catch(() => console.log('Unable to connect to database.'));
