import shortenURL from '../../src/services/shortenURL';

describe('Tests for the LoadURLFromDB method for the ShortenURL class', () => {

  beforeEach( async () => {
    await shortenURL.InitializeDB('../../test/db/test.db');
  });

  test('Should return the URL that was stored using the StoreURLInDB method', async () => {

    //Arrange
    expect.assertions(2);
    const TEST_URL = 'www.fakeurl.com/asdsadgfadsfasdfsgassadfasdfasfasfsadf'
    const TEST_HOST ='testhost.com'

    //Act
    const SHORT_URL = await shortenURL.StoreURLInDB(TEST_HOST, TEST_URL);
    // Seperate the URL_KEY from the SHORT_URL and use that to get the original URL
    const RESULT = await shortenURL.LoadURLFromDB(SHORT_URL.shortURL.split('/').slice(-1).pop());

    //Assert
    expect(RESULT.status).toBe(1);
    expect(RESULT.url).toEqual(TEST_URL);
  });
});
