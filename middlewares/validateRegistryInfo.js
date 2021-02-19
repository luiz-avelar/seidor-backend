const validateRegistryInfo = (req, res, next) => {
  const { startDate, driver, car, reason } = req.body;
  if (!startDate || !driver || !car || !reason) {
    res.status(401);
    return res.json({ message: 'Missing registry info.' });
  }
  next();
};

module.exports = validateRegistryInfo;
