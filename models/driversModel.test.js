const { driversModel } = require('./index');
const db = require('./connection');

const mockDriver1 = { id: 1, name: 'Felipe', available: true };
const mockDriver2 = { id: 2, name: 'Lucas', available: true };

describe('Drivers Model', () => {
  beforeEach(() => {
    Object.keys(db).forEach((key) => delete db[key]);
    db['drivers'] = [mockDriver1];
  });
  afterEach(() => {
    Object.keys(db).forEach((key) => delete db[key]);
  });

  test('register a driver', () => {
    expect(driversModel.create(mockDriver2.name)).toEqual(mockDriver2);
  });

  test('update a driver', () => {
    expect(driversModel.update(mockDriver1.id, 'Lucas')).toEqual({
      id: mockDriver1.id,
      name: 'Lucas',
      available: mockDriver1.available,
    });
  });

  test('list a driver by its id', () => {
    expect(driversModel.listById(mockDriver1.id)).toEqual(mockDriver1);
  });

  test('remove a driver', () => {
    driversModel.remove(mockDriver1.id);
    expect(db.drivers).toEqual([]);
  });

  test('list every driver', () => {
    db.drivers.push(mockDriver2);
    expect(driversModel.listAll()).toEqual([mockDriver1, mockDriver2]);
  });

  test("change driver's availability", () => {
    expect(driversModel.toggleAvailability(mockDriver1.id)).toEqual({
      id: mockDriver1.id,
      name: mockDriver1.name,
      available: !mockDriver1.available,
    });
  });
});
