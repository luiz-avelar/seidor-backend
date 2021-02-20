const { registryModel } = require('./index');
const db = require('./connection');

const mockCar1 = { plate: 'node123', color: 'red', brand: 'toyota', available: true };
const mockCar2 = { plate: 'js123', color: 'blue', brand: 'ford', available: true };
const mockDriver1 = { id: 1, name: 'Felipe', available: true };
const mockDriver2 = { id: 2, name: 'Lucas', available: true };
const mockRegistry1 = {
  id: 1,
  startDate: '01/02/2021',
  endDate: '',
  driver: 1,
  car: 'node123',
  reason: 'delivery products',
};
const mockRegistry2 = {
  id: 2,
  startDate: '10/02/2021',
  endDate: '',
  driver: 2,
  car: 'js123',
  reason: 'take someone to the airport',
};

describe('Cars Model', () => {
  beforeEach(() => {
    Object.keys(db).forEach((key) => delete db[key]);
    db['cars'] = [mockCar1, mockCar2];
    db['drivers'] = [mockDriver1, mockDriver2];
    db['registries'] = [mockRegistry1];
  });
  afterEach(() => {
    Object.keys(db).forEach((key) => delete db[key]);
  });

  test('create a registry', () => {
    expect(
      registryModel.create(
        mockRegistry2.startDate,
        mockRegistry2.driver,
        mockRegistry2.car,
        mockRegistry2.reason,
      ),
    ).toEqual(mockRegistry2);
  });

  test('update a registry', () => {
    expect(registryModel.update(mockRegistry1.id, '05/02/2021')).toEqual({
      id: mockRegistry1.id,
      startDate: mockRegistry1.startDate,
      endDate: '05/02/2021',
      driver: mockRegistry1.driver,
      car: mockRegistry1.car,
      reason: mockRegistry1.reason,
    });
  });

  test('list a registry by its id', () => {
    expect(registryModel.listById(mockRegistry1.id)).toEqual(mockRegistry1);
    expect(registryModel.listById(-1)).toEqual({});
  });

  test('list every registry', () => {
    db.registries.push(mockRegistry2);
    expect(registryModel.listAll()).toEqual([mockRegistry1, mockRegistry2]);
  });
});
