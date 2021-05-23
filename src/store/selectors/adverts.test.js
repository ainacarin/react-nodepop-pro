import { getAdvertDetail, getAdverts } from './adverts';

describe('Test getAdverts', () => {
  const data = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
  test('should return all adverts', () => {
    const result = getAdverts({ adverts: { data } });
    expect(result).toHaveLength(data.length);
  });

  test('should return advert by id', () => {
      const dataId = data[0].id;
      const dataExpected = data[0].id;
    const result = getAdvertDetail({ adverts: { data } }, dataId );
    expect(result.id).toBe(dataExpected);
  });
});
