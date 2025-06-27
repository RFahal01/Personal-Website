const { filterRooms } = require('../script');

describe('filterRooms', () => {
  const data = [
    { Location: 'ADLER JOURNALISM', 'Room Number': '101', 'Building Number': 'AJB', Abbreviation: 'AJB' },
    { Location: 'MAIN LIBRARY', 'Room Number': '201', 'Building Number': 'LIB', Abbreviation: 'LIB' },
  ];

  test('matches search term against multiple fields', () => {
    const result = filterRooms(data, 'lib');
    expect(result).toEqual([
      { Location: 'MAIN LIBRARY', 'Room Number': '201', 'Building Number': 'LIB', Abbreviation: 'LIB' },
    ]);
  });
});
