import { verifyJWT } from '../services/jwt.js';
import { Transaction } from '../models/association.js';
import { Op } from 'sequelize';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';

export const BusinessTransactionController = async (req, res) => {
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

    const { filter } = req.query;

    let whereClause = { business_id: decoded.id };
    if (filter === 'discounted') {
      whereClause.discounted = true;
    } else if (filter === 'full-price') {
      whereClause.discounted = false;
    }

    const transactions = await Transaction.findAll({
      where: whereClause,
      order: [['date', 'DESC'], ['time', 'DESC']]
    });

    const completedTransactions = transactions.filter(t => t.status === 'completed');
    const pendingTransactions = transactions.filter(t => t.status === 'pending');

    const totalAmount = completedTransactions.reduce((sum, t) => sum + parseFloat(t.after_discount_price), 0);
    const averageAmount = completedTransactions.length > 0 ? totalAmount / completedTransactions.length : 0;

    const formatDate = (dateString, timeString) => {
      const [year, month, day] = dateString.split('-');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${timeString}`;
    };

    const response = {
      transactions: transactions.map(t => ({
        transaction_id: t.transaction_id,
        date: formatDate(t.date, t.time),
        customer_product: t.customer_product,
        amount: parseFloat(t.amount).toFixed(2),
        discounted_amount: t.discounted_amount ? parseFloat(t.discounted_amount).toFixed(2) : null,
        after_discount_price: parseFloat(t.after_discount_price).toFixed(2),
        status: t.status
      })),
      metrics: {
        totalAmount: totalAmount.toFixed(2),
        completedTransactions: completedTransactions.length,
        pendingTransactions: pendingTransactions.length,
        averageAmount: averageAmount.toFixed(2)
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error in BusinessTransactionController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const exportCSV = async (req, res) => {
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

    const transactions = await Transaction.findAll({
      where: { business_id: decoded.id },
      order: [['date', 'DESC'], ['time', 'DESC']]
    });

    const fields = ['transaction_id', 'date', 'time', 'customer_product', 'amount', 'discounted_amount', 'after_discount_price', 'status'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(transactions);

    res.header('Content-Type', 'text/csv');
    res.attachment('transactions.csv');
    return res.send(csv);
  } catch (error) {
    console.error('Error in exportCSV:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const downloadInvoices = async (req, res) => {
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

    const transactions = await Transaction.findAll({
      where: { business_id: decoded.id },
      order: [['date', 'DESC'], ['time', 'DESC']]
    });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=invoices.pdf');
    doc.pipe(res);

    transactions.forEach((transaction, index) => {
      if (index > 0) {
        doc.addPage();
      }
      doc.fontSize(18).text('Invoice', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Transaction ID: ${transaction.transaction_id}`);
      doc.text(`Date: ${transaction.date} ${transaction.time}`);
      doc.text(`Product: ${transaction.customer_product}`);
      doc.text(`Amount: ₹${parseFloat(transaction.amount).toFixed(2)}`);
      doc.text(`Discounted Amount: ${transaction.discounted_amount ? `₹${parseFloat(transaction.discounted_amount).toFixed(2)}` : 'N/A'}`);
      doc.text(`After Discount Price: ₹${parseFloat(transaction.after_discount_price).toFixed(2)}`);
      doc.text(`Status: ${transaction.status}`);
    });

    doc.end();
  } catch (error) {
    console.error('Error in downloadInvoices:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// The duplicate export statement has been removed