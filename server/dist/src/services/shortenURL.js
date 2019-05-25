"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var shortid = require("shortid");
var sqlite3 = require("sqlite3");
var path = require("path");
var ShortenURL = /** @class */ (function () {
    function ShortenURL(urlMapInMemory, databasePath) {
        var _this = this;
        if (urlMapInMemory === void 0) { urlMapInMemory = {}; }
        if (databasePath === void 0) { databasePath = '../db/shortURL.db'; }
        this.InitializeDB = function (databasePath) {
            if (databasePath === void 0) { databasePath = _this.databasePath; }
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.databasePath = databasePath;
                    console.log('databasePath', path.join(__dirname, this.databasePath));
                    this.first = false;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.db = new sqlite3.Database(path.join(__dirname, _this.databasePath), function (err) {
                                if (err) {
                                    console.log(err.message);
                                    reject(err);
                                }
                                console.log('Connected to the database.');
                                _this.db.run('CREATE TABLE IF NOT EXISTS url(URLKEY text primary key not null unique, URL text not null)', function (err) {
                                    if (err) {
                                        console.error(err.message);
                                        reject(err);
                                    }
                                    if (this.changes != 0) {
                                        console.log("Table created");
                                        resolve("Table created");
                                    }
                                    else {
                                        resolve("Table exist");
                                    }
                                });
                            });
                        })];
                });
            });
        };
        this.StoreURLInMemory = function (host, longURL) {
            var URL_KEY = shortid.generate();
            _this.urlMapInMemory[URL_KEY] = longURL;
            return { 'shortURL': host + "/" + URL_KEY };
        };
        this.LoadURLFromMemory = function (shortURL) {
            var RESULT = _this.urlMapInMemory[shortURL];
            return RESULT ? { status: 1, url: RESULT, message: '' } : { status: 0, url: '', message: shortURL + " does not exist" };
        };
        this.StoreURLInDB = function (host, longURL) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.first) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.InitializeDB()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            var URL_KEY = shortid.generate();
                            _this.db.run("INSERT INTO url(URLKEY, URL) VALUES('" + URL_KEY + "', '" + longURL + "')", function (err) {
                                if (err)
                                    reject(err);
                                console.log("Rows inserted " + this.changes);
                                resolve({ 'shortURL': host + "/" + URL_KEY });
                            });
                        })];
                }
            });
        }); };
        this.LoadURLFromDB = function (shortURL) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.first) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.InitializeDB()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.db.all("SELECT URL FROM url WHERE URLKEY='" + shortURL + "'", function (err, url) {
                                if (err) {
                                    reject(err);
                                }
                                if (url.length == 0) {
                                    resolve({ status: 0, url: '', message: shortURL + " does not exist" });
                                }
                                else {
                                    resolve({ status: 1, url: url[0].URL, message: '' });
                                }
                            });
                        })];
                }
            });
        }); };
        this.urlMapInMemory = urlMapInMemory;
        this.databasePath = databasePath;
        this.first = true;
    }
    return ShortenURL;
}());
;
exports.default = new ShortenURL();
//# sourceMappingURL=shortenURL.js.map