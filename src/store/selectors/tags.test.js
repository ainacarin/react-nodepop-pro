import { getTags } from './tags';

describe('Test tags selector', () => {
  const data = ['tag1', 'tag2', 'tag3', 'tag4' ];
  test('should return all tags', () => {
    const result = getTags({ tags: { data } });
    expect(result).toHaveLength(data.length);
    expect(result).toStrictEqual(data);
  });

});
