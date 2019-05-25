import server from '../src/app';
import * as request from "supertest";

describe('Test all the routes managed by app.ts', () => {

  afterEach(() => {
    server.close();
  });

  test('Should loads the home page', async() => {

    //Arrange
    expect.assertions(1);

    //Act
    const RESULT = await request(server).get('/');

    //Assert
    expect(RESULT.status).toEqual(200);
  });


  test('Should give a shorter url', async() => {

    //Arrange
    expect.assertions(2);
    const TEST_URL = 'www.fakeurl.com/asdsadgfadsfasdfsgassadfasdfasfasfsadf'

    //Act
    const RESULT = await request(server).post('/api/shortenurl').send({url: TEST_URL});
    const JSON_DATA = await JSON.parse(RESULT.text)
    //Assert
    expect(RESULT.status).toEqual(200);
    expect(JSON_DATA).toHaveProperty('shortURL');
  });

});


// describe('Test /:shortURL route', () => {

//   afterAll(() => {
//     server.close();
//   });
//   let shortURL;
//   beforeEach(async () => {
//     const TEST_URL = 'www.fakeurl.com/asdsadgfadsfasdfsgassadfasdfasfasfsadf'
//     const RESULT = await request(server).post('/api/shortenurl').send({url: TEST_URL});

//     shortURL = JSON.parse(RESULT.text).shortURL
//     console.log({shortURL})
//   });

//   test('Should give the long url back', async() => {

//     //Arrange
//     expect.assertions(2);

//     //Act
//     const RESULT = await request(server).get(`/${shortURL}`);
//     console.log(`/${shortURL}`)
//     console.log('RESULT.redirect')
//     console.log(RESULT.error);


//     //Assert
//     expect(RESULT.status).toEqual(302);
//     expect(RESULT.redirect).toBeTruthy();
//   });

// });
