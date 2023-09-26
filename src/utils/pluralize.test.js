import { pluralize } from './pluralize';

test('pluralizes words correctly', () => {
    expect(pluralize('count', 4)).toBe('counts');
    expect(pluralize('count', 1)).toBe('count');
    expect(pluralize('man', 4, 'men')).toBe('men');
});
