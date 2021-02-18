const validateRegistryInfo = (req, res, next) => {
  const { startDate, driver, car, reason } = req.body;
  if (!startDate || !driver || !car || !reason)
    return res.status(400).json({ message: 'Missing registry info.' });
  next();
};

module.exports = validateRegistryInfo;
