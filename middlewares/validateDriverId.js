const validateDriverId = (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'Missing driver id.' });

  next();
};

module.exports = validateDriverId;
