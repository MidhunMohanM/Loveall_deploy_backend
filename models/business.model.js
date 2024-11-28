import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Business = sequelize.define('business', {
    business_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    business_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    business_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    business_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entity_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [10, 10]
        }
    },
    business_address: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    zip_code: {
        type: DataTypes.STRING,
        validate: {
            len: [6, 6]
        }
    },
    gstin: {
        type: DataTypes.STRING,
        validate: {
            len: [15, 15]
        }
    },
    tan: {
        type: DataTypes.STRING,
        validate: {
            len: [10, 10]
        }
    },
    business_purpose: {
        type: DataTypes.TEXT
    },
    owner_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [10, 10]
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    manual_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    temp_pass: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    otp: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    otp_expiration_time: {
        type: DataTypes.DATE,
        defaultValue: null
    }
}, {
    tableName: 'business',
    timestamps: false
});

export default Business;
