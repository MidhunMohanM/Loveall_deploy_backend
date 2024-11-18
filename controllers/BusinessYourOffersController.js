import { verifyJWT } from '../services/jwt.js';
import Business from '../models/business.model.js';
import Store from '../models/store.model.js';
import Offers from '../models/offer.model.js';

const businessYourOffersController = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = verifyJWT(token);
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: 'Invalid token' });
    }

    const business = await Business.findByPk(decoded.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const stores = await Store.findAll({
      where: { business_id: business.business_id },
      include: [{
        model: Offers,
        as: 'Offers',
        attributes: ['offer_type', 'end_date']
      }],
      attributes: ['store_name', 'address', 'manager_name', 'phone_number']
    });

    console.log('Stores found:', JSON.stringify(stores, null, 2));

    const formattedStores = stores.map(store => {
      console.log('Processing store:', store.store_name);
      console.log('Store offers:', store.Offers);
      
      return {
        storeName: store.store_name,
        address: store.address,
        managerName: store.manager_name || 'Not specified',
        contactNumber: store.phone_number,
        offers: store.Offers && store.Offers.length > 0 ? store.Offers.map(offer => ({
          offerType: offer.offer_type,
          validTill: offer.end_date
        })) : []
      };
    });

    console.log('Formatted stores:', JSON.stringify(formattedStores, null, 2));

    res.status(200).json(formattedStores);
  } catch (error) {
    console.error('Error in businessYourOffersController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default businessYourOffersController;