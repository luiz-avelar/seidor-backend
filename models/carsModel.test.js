const { carsModel } = require('./index');
const db = require('./connection');

const mockCar1 = { plate: 'node123', color: 'red', brand: 'toyota', available: true };
const mockCar2 = { plate: 'js123', color: 'blue', brand: 'ford', available: true };

describe('Cars Model', () => {
  beforeEach(() => {
    Object.keys(db).forEach((key) => delete db[key]);
    db['cars'] = [mockCar1];
  });
  afterEach(() => {
    Object.keys(db).forEach((key) => delete db[key]);
  });

  test('register a car', () => {
    expect(carsModel.create(mockCar2.plate, mockCar2.color, mockCar2.brand)).toEqual(mockCar2);
  });

  test('update a car', () => {
    expect(carsModel.update(mockCar1.plate, 'blue', undefined)).toEqual({
      plate: mockCar1.plate,
      color: 'blue',
      brand: mockCar1.brand,
      available: mockCar1.available,
    });
    expect(carsModel.update(mockCar1.plate, undefined, 'ford')).toEqual({
      plate: mockCar1.plate,
      color: 'blue',
      brand: 'ford',
      available: mockCar1.available,
    });
    expect(carsModel.update(mockCar1.plate, 'red', 'toyota')).toEqual({
      plate: mockCar1.plate,
      color: mockCar1.color,
      brand: mockCar1.brand,
      available: mockCar1.available,
    });
  });

  test('list a car by its plate', () => {
    expect(carsModel.listByPlate(mockCar1.plate)).toEqual(mockCar1);
  });

  test('remove a car', () => {
    carsModel.remove(mockCar1.plate);
    expect(db.cars).toEqual([]);
  });

  test('list every cars', () => {
    db.cars.push(mockCar2);
    expect(carsModel.listAll()).toEqual([mockCar1, mockCar2]);
  });

  test("change cars's availability", () => {
    expect(carsModel.toggleAvailability(mockCar1.plate)).toEqual({
      plate: mockCar1.plate,
      color: mockCar1.color,
      brand: mockCar1.brand,
      available: !mockCar1.available,
    });
  });
});
