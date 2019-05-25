import shortenURL from '../../src/services/shortenURL';

describe('Tests for the StoreURLInDB method for the ShortenURL class', () => {

  beforeEach(async () => {
    await shortenURL.InitializeDB('../../test/db/test.db');
  });

  test('Should return an object with shortURL key', async () => {

    //Arrange
    expect.assertions(1);
    const TEST_URL = 'www.fakeurl.com/asdsadgfadsfasdfsgassadfasdfasfasfsadf'
    const TEST_HOST ='testhost.com'

    //Act
    const RESULT = await shortenURL.StoreURLInDB(TEST_HOST, TEST_URL);

    //Assert
    expect(RESULT.shortURL).toBeDefined();
  });
})
