import { Image } from './image';

describe('Image', () => {
  it('should create an instance', () => {
    expect(new Image('https://example.com/photo.jpg')).toBeTruthy();
  });
});
