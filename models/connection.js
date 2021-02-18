module.exports = {
  cars: [
    { plate: 'var123', color: 'blue', brand: 'renault', available: false },
    { plate: 'const123', color: 'yellow', brand: 'renault', available: false },
    { plate: 'let123', color: 'green', brand: 'fiat', available: true },
  ],
  drivers: [
    { id: 1, name: 'Carlos', available: false },
    { id: 2, name: 'Rogério', available: false },
    { id: 3, name: 'Roberto', available: true },
  ],
  registries: [
    { id: 1, startDate: '31/01/2021', endDate: '', car: 'var123', driver: 1 },
    { id: 2, startDate: '05/02/2021', endDate: '', car: 'const123', driver: 2 },
    { id: 2, startDate: '07/02/2021', endDate: '09/02/2021', car: 'let123', driver: 3 },
  ],
};
