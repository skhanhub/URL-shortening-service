import shortenURL from '../../src/services/shortenURL';

describe('Tests for the StoreURLInDB method for the ShortenURL class', () => {

  test('Should return an object with shortURL key', async () => {

    //Arrange
    expect.assertions(1);
    const TEST_URL = 'www.fakeurl.com/asdsadgfadsfasdfsgassadfasdfasfasfsadf'
    const TEST_HOST ='testhost.com'
    await shortenURL.changeDb('../../test/db/test.db');

    //Act
    const SHORT_URL = await shortenURL.StoreURLInDB(TEST_HOST, TEST_URL);
    // Seperate the URL_KEY from the SHORT_URL and use that to get the original URL
    const RESULT = await shortenURL.LoadURLFromMemory(SHORT_URL.shortURL.split('/').slice(-1).pop()); 
    console.log(RESULT);
    //Assert
    expect(RESULT.status).toBe(1);
    expect(RESULT.url).toEqual(TEST_URL);
    
  });
})