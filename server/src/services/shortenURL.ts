import * as shortid from "shortid";
import * as sqlite3 from 'sqlite3';
import * as path from "path";

type  ReturnObject  = {
    status: number,
    url: string,
    message: string,
  }


class ShortenURL{
    databasePath: string;
    urlMapInMemory: { [shortURL: string]: string };
    db: sqlite3.Database;
    first: boolean;

    constructor(urlMapInMemory = {}, databasePath = '../db/shortURL.db'){

            this.urlMapInMemory = urlMapInMemory;
            this.databasePath = databasePath;
            this.first = true;
    }
    

    private InitializeDB = async () =>{
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(path.join(__dirname, this.databasePath), (err) => {
                if (err) {
                    console.log(err.message);
                    reject(err);
                }
                console.log('Connected to the database.');
                this.db.run('CREATE TABLE IF NOT EXISTS url(URLKEY text primary key not null unique, URL text not null)', function(err) {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    }
                    if(this.changes != 0){
                        console.log(`Table created`);
                        resolve(`Table created`);
                    }else{
                        resolve(`Table exist`);
                    }
                });
            });
        });
    };

    changeDb = async (databasePath: string) => {
        this.databasePath = databasePath;
        await this.InitializeDB();
    }
    
    StoreURLInMemory = (host: string, longURL: string): { [URL_KEY: string]: string } => {
        const URL_KEY = shortid.generate();
        this.urlMapInMemory[URL_KEY] = longURL;
        return {'shortURL': `${host}/${URL_KEY}`};
    }

    LoadURLFromMemory = (shortURL: string): ReturnObject =>{
        const RESULT = this.urlMapInMemory[shortURL]
        return RESULT ? { status: 1, url: RESULT, message: ''} : {status: 0, url: '', message: `${shortURL} does not exist`}
    }

    StoreURLInDB = async (host: string, longURL: string): Promise<{ [shortURL: string]: string }> => {

        if(this.first){
            await this.InitializeDB()
            this.first = false;
        }

        return new Promise((resolve, reject) => {
            const URL_KEY = shortid.generate();

            this.db.run(`INSERT INTO url(URLKEY, URL) VALUES('${URL_KEY}', '${longURL}')`, function(err) {
                if (err) reject(err); 

                console.log(`Rows inserted ${this.changes}`);
                resolve({'shortURL': `${host}/${URL_KEY}`});
            });
        });       
    };

    LoadURLFromDB = async (shortURL: string): Promise<ReturnObject> => {

        if(this.first){
            await this.InitializeDB();
            this.first = false;
        }
        return new Promise((resolve, reject) => {
            
            this.db.all(`SELECT URL FROM url WHERE URLKEY='${shortURL}'`, (err, url) => {
                if (err) {
                    reject(err);
                }
                console.log({url})
                if(url.length == 0){
                    resolve({status: 0, url: '', message: `${shortURL} does not exist`});
                }
                else{
                    resolve({status: 1, url: url[0].URL, message: ''});
                } 
            });
        });
    };
};

export default new ShortenURL();
