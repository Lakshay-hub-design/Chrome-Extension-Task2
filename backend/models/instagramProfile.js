const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const InstagramProfile = sequelize.define("InstagramProfile",{
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    display_name: {
        type: DataTypes.STRING
    },
    followers: {
        type: DataTypes.INTEGER,
        validate: { min: 0 }
    },
    following: {
        type: DataTypes.INTEGER,
        validate: { min: 0 }
    },
    posts: {
        type: DataTypes.INTEGER,
        validate: { min: 0 }
    },
    bio: {
        type: DataTypes.STRING
    }
})

module.exports = InstagramProfile