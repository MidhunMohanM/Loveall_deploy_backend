import { Cards, User } from '../models/association.js';
import { verifyJWT } from '../services/jwt.js';

const getProfileCardData = async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const decodedToken = verifyJWT(token);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const user = await User.findOne({
      where: { user_id: decodedToken.id },
      attributes: ['first_name', 'last_name'],
      include: [{
        model: Cards,
        attributes: ['card_number', 'purchase_date', 'expiry_date']
      }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const card = user.cards.length > 0 ? user.cards[0] : {};
    return res.status(200).json({
      first_name: user.first_name,
      last_name: user.last_name,
      card_number: card.card_number,
      purchase_date: card.purchase_date,
      expiry_date: card.expiry_date
    });

  } catch (error) {
    console.error('Error fetching profile card data', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export { getProfileCardData };
