import { UniqueIdService } from './unique-id.service';

describe(UniqueIdService.name, () => {

  let service: UniqueIdService = null;
  beforeEach(() => {
    service = new UniqueIdService();
  })

  it('#generateUniqueIdWithPrefix should work', () => {
     const id = service.generateUniqueIdWithPrefix('app');

    expect(id.startsWith('app-')).toBeTrue();
  });

  it('#generateUniqueIdWithPrefix should throw error', () => {
    expect(() => service.generateUniqueIdWithPrefix(null)).toThrow();
    expect(() => service.generateUniqueIdWithPrefix(undefined)).toThrow();
    expect(() => service.generateUniqueIdWithPrefix('')).toThrow();
  });

  it('#generateUniqueIdWithPrefix should throw error in a different way ', () => {
    const emptyValues = [null, undefined, '', '0', '1'];
    emptyValues.forEach(emptyValue => {
      expect(() => service.generateUniqueIdWithPrefix(emptyValue)).toThrow();
    })
  });

  it('#generateUniqueIdWithPrefix should not generate duplicate Ids', () => {
     const firstId = service.generateUniqueIdWithPrefix('app');
    const secondId = service.generateUniqueIdWithPrefix('app');

    expect(firstId).not.toBe(secondId);
  });

  it('#generateUniqueIdWithPrefix should not generate duplicate Ids better way', () => {
     const ids = new Set();
    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }
    expect(ids.size).toBe(50);
  });

  it('#getNumberOfGeneratedUniqueIds should', () => {
     service.generateUniqueIdWithPrefix('app');
    service.generateUniqueIdWithPrefix('app');
    const numberOfIds = service.getNumberOfGeneratedUniqueIds();

    expect(numberOfIds).toBe(2);
  });
});
