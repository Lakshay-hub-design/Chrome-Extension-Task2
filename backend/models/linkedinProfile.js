const { DataTypes } = require("sequelize")
const sequelize = require('../config/db')

const LinkedinProfile = sequelize.define("LinkedinProfile", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    headline: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    about: {
        type: DataTypes.STRING
    },
    follower_count: {
        type: DataTypes.INTEGER,
        validate: {min:0}
    },
    connection_count: {
       type: DataTypes.INTEGER,
       validate: {min:0}
    }
})

module.exports = LinkedinProfile