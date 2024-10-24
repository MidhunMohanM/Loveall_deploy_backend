import { User } from '../models/association.js';
import { verifyJWT } from '../services/jwt.js';

const getPersonalInfo = async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const decodedToken = verifyJWT(token);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const user = await User.findOne({
      where: { user_id: decodedToken.id },
      attributes: ['first_name', 'last_name', 'email', 'phone_number', 'date_of_birth']
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error('Error fetching personal info', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const updatePersonalInfo = async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const decodedToken = verifyJWT(token);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const { first_name, last_name, email, phone_number, date_of_birth } = req.body;

    const [updatedRows] = await User.update(
      { first_name, last_name, email, phone_number, date_of_birth },
      { where: { user_id: decodedToken.id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'User not found or no changes made' });
    }

    return res.status(200).json({ message: 'Personal information updated successfully' });

  } catch (error) {
    console.error('Error updating personal info', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export { getPersonalInfo, updatePersonalInfo };