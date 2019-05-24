import shortenURL from '../../src/services/shortenURL';

describe('Tests for the LoadURLFromMemory method for the ShortenURL class', () => {

  test('Should return the URL that was stored using the StoreURLInMemory method', () => {

    //Arrange
    expect.assertions(2);
    const TEST_URL = 'www.fakeurl.com/asdsadgfadsfasdfsgassadfasdfasfasfsadf'
    const TEST_HOST ='testhost.com'

    //Act
    const SHORT_URL = shortenURL.StoreURLInMemory(TEST_HOST, TEST_URL).shortURL;
    // Seperate the URL_KEY from the SHORT_URL and use that to get the original URL
    const RESULT = shortenURL.LoadURLFromMemory(SHORT_URL.split('/').slice(-1).pop()); 

    //Assert
    expect(RESULT.status).toBe(1);
    expect(RESULT.url).toEqual(TEST_URL);
  });
})