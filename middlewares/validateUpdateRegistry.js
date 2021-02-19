const validateUpdateRegistry = (req, res, next) => {
  const { endDate } = req.body;

  if (!endDate) {
    res.status(401);
    return res.json({ message: 'Missing end date.' });
  }

  next();
};

module.exports = validateUpdateRegistry;
