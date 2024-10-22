import Admin from "./admin.model.js";
import AdminActivityLog from "./adminActivityLog.model.js";
import BusinessActivityLog from "./businessActivityLog.model.js";
import Cards from "./card.model.js";
import CardPurchaseTransaction from "./cardPurchaseTransaction.model.js";
import Feedback from "./feedback.model.js";
import Offers from "./offer.model.js";
import OfferTransaction from "./offerTransaction.model.js";
import Otp from "./otp.model.js";
import Store from "./store.model.js";
import User from "./user.model.js";
import Category from "./category.model.js";
import StoresSubaccount from "./storesSubaccount.model.js";
import Donation from "./donation.model.js";
import Volunteer from "./volunteer.model.js";
// Users Association
// Users associations
User.hasMany(CardPurchaseTransaction, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(OfferTransaction, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Cards, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Feedback, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Stores associations
Store.hasMany(StoresSubaccount, { foreignKey: 'store_id', onDelete: 'CASCADE' });
Store.hasMany(Offers, { foreignKey: 'store_id', onDelete: 'CASCADE' });
Store.hasMany(OfferTransaction, { foreignKey: 'store_id', onDelete: 'CASCADE' });
Store.hasMany(Feedback, { foreignKey: 'store_id', onDelete: 'CASCADE' });
Store.hasMany(BusinessActivityLog, { foreignKey: 'store_id', onDelete: 'CASCADE' });
Store.belongsTo(Category, {foreignKey: 'category_id', as: 'storeCategory', onDelete: 'CASCADE'})

// Category Association
Category.hasMany(Store, { foreignKey: 'category_id', onDelete: 'CASCADE'})

// StoresSubaccount associations
StoresSubaccount.belongsTo(Store, { foreignKey: 'store_id', onDelete: 'CASCADE' });

// Offers associations
Offers.belongsTo(Store, { foreignKey: 'store_id', onDelete: 'CASCADE' });

// CardPurchaseTransaction associations
CardPurchaseTransaction.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// OfferTransaction associations
OfferTransaction.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
OfferTransaction.belongsTo(Offers, { foreignKey: 'offer_id', onDelete: 'CASCADE' });
OfferTransaction.belongsTo(Store, { foreignKey: 'store_id', onDelete: 'CASCADE' });

// Cards associations
Cards.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Feedback associations
Feedback.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Feedback.belongsTo(Store, { foreignKey: 'store_id', onDelete: 'CASCADE' });

// BusinessActivityLog Association
BusinessActivityLog.belongsTo(Store, { foreignKey: 'store_id', onDelete: 'CASCADE' });

// Admin associations
Admin.hasMany(AdminActivityLog, { foreignKey: 'admin_id', onDelete: 'CASCADE' });

// AdminActivityLog associations
AdminActivityLog.belongsTo(Admin, { foreignKey: 'admin_id', onDelete: 'CASCADE' });

// Export models for access in other parts of the application
export {
    User,
    Store,
    StoresSubaccount,
    Offers,
    CardPurchaseTransaction,
    OfferTransaction,
    Cards,
    Feedback,
    Otp,
    Admin,
    AdminActivityLog,
    BusinessActivityLog,
    Category,
    Donation,
    Volunteer
};
