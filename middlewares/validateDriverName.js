const validateDriverName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'Missing driver name.' });

  next();
};

module.exports = validateDriverName;
