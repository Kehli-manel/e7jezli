//import data
const { sequelize, Route, Ville, OffDays, Vehicule } = require('./db.js');



async function initDB() {

    await sequelize.sync({ force: true });

    
    const route = await Route.create({
        departVille: {
            name: 'alger'
        },
        arriveVille: {
            name: 'oran'
        },
        date: '12/07/2024',
        heure_depart: '20:00',
        heure_arrive: '23:00',
        price: 200,
        offDays: { 
            day: 'Friday'
        },
        vehicule:{
            name:'B1'
        }
    }, {
        include: [
            { model: Ville, as: 'departVille' },
            { model: Ville, as: 'arriveVille' },
            { model: OffDays, as: 'offDays' },
            { model: Vehicule, as: 'vehicule' }]
    });
};
initDB();
