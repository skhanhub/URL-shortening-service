import shortenURL from '../../src/services/shortenURL';

describe('Tests for the StoreURLInMemory method for the ShortenURL class', () => {

  test('Should return an object with shortURL key', () => {

    //Arrange
    expect.assertions(1);
    const TEST_URL = 'www.fakeurl.com/asdsadgfadsfasdfsgassadfasdfasfasfsadf'
    const TEST_HOST ='testhost.com'

    //Act
    const RESULT = shortenURL.StoreURLInMemory(TEST_HOST, TEST_URL);

    //Assert
    expect(RESULT.shortURL).toBeDefined();
  });
})