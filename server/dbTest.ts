import * as shortid from "shortid";
import * as sqlite3 from 'sqlite3';

const DB = new sqlite3.Database('./test.db', (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Connected to the test database.');
});

// DB.run('CREATE TABLE IF NOT EXISTS url(URLKEY text primary key not null unique, URL text not null)', function(err) {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log(`Table created`);
// });

// const URL_KEY = shortid.generate();


// DB.run(`INSERT INTO url(URLKEY, URL) VALUES('${URL_KEY}', '${URL_KEY+'_long'}')`, function(err) {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log(`Rows inserted ${this.changes}`);
// });

DB.each(`SELECT url FROM url WHERE URLKey='LhuL07yGo'`, (err, url) => {
    if (err) {
    console.log(err.message);
      throw err;
    }
    console.log(url.URL);
});

DB.close((err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Close the database connection.');
});

