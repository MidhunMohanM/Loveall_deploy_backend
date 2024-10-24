import { User } from '../models/association.js';
import { verifyJWT } from '../services/jwt.js';

const getProfileAccountData = async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const decodedToken = verifyJWT(token);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const user = await User.findOne({
      where: { user_id: decodedToken.id },
      attributes: ['first_name', 'last_name', 'email', 'phone_number', 'address', 'profile_picture', 'date_of_birth']
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error('Error fetching profile account data', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export { getProfileAccountData };