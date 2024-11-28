import { verifyJWT } from '../services/jwt.js';
import Business from '../models/business.model.js';

const businessProfileController = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    console.log("Received Authorization header:", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Extracted token:", token);

    let decoded;
    try {
      decoded = verifyJWT(token);
      console.log("Decoded token:", decoded);
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: 'Invalid token' });
    }

    const business = await Business.findOne({
      where: { business_id: decoded.id },
      attributes: [
        'business_name',
        'business_email',
        'business_type',
        'entity_type',
        'contact_number',
        'business_address',
        'city',
        'state',
        'zip_code',
        'gstin',
        'tan',
        'business_purpose',
        'owner_name',
        'owner_contact_number',
        'updated_at'
      ]
    });

    console.log("Found business:", business ? business.business_name : 'Not found');

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const response = {
      business_name: business.business_name || '',
      business_email: business.business_email || '',
      business_type: business.business_type || '',
      entity_type: business.entity_type || '',
      contact_number: business.contact_number || '',
      business_address: business.business_address || '',
      city: business.city || '',
      state: business.state || '',
      zip_code: business.zip_code || '',
      gstin: business.gstin || '',
      tan: business.tan || '',
      business_purpose: business.business_purpose || '',
      owner_name: business.owner_name || '',
      owner_contact_number: business.owner_contact_number || '',
      updated_at: business.updated_at || new Date()
    };

    console.log("Sending response:", response);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error in businessProfileController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default businessProfileController;

