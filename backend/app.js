/*const express = require('express');
const { sequelize, Route, Ville, OffDays, Vehicule } = require('./db.js');

const app = express();
app.use(express.json());

app.get('/route', async (req, res) => {
    try {
        const routes = await Route.findAll({
            include: [
                { model: Ville, as: 'departVille' },
                { model: Ville, as: 'arriveVille' },
                 { model: OffDays, as: 'offDays' },
                 { model: Vehicule, as: 'vehicule' }]
        });
        res.json(routes);
    } catch (error) {
        res.status(500).json({ message: 'internal server error', error: error.message })
    }
});




app.listen(3000);*/

