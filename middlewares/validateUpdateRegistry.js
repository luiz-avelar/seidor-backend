const validateUpdateRegistry = (req, res, next) => {
  const { endDate } = req.body;

  if (!endDate) return res.status(400).json({ message: 'Missing end date.' });

  next();
};

module.exports = validateUpdateRegistry;
