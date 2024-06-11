const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('ehjezli', 'root', '', { host: 'localhost', dialect: 'mysql' });

//create table ville
const Ville = sequelize.define('ville', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

//create table route
const Route = sequelize.define('route', {
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    heure_depart: {
        type: DataTypes.STRING,
        allowNull: false
    },
    heure_arrive: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

//create table offDays
const OffDays = sequelize.define('offDays', {
    day: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

//create table vehicules
const Vehicule = sequelize.define('vehicule', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
//relation between route and ville
Route.belongsTo(Ville, { as: 'departVille', foreignKey: 'id_depart' });
Route.belongsTo(Ville, { as: 'arriveVille', foreignKey: 'id_arrive' });

//relation  between route and vehicule

Route.belongsTo(Vehicule, { as: 'vehicule',foreignKey: 'id_vehicule' });

//relation between route and off days

Route.belongsTo(OffDays, {as: 'offDays', foreignKey:'off_days'});

//exporting data
module.exports = { sequelize, Route, Ville, OffDays, Vehicule};