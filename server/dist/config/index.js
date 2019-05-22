'use struct';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    development: {
        sitename: 'Compare Movie Price [Development]',
        timeout: 4000,
        baseURL: 'http://webjetapitest.azurewebsites.net/api',
        cinemaList: ['cinemaworld', 'filmworld'],
    },
    production: {
        sitename: 'Compare Movie Price',
        timeout: 4000,
        baseURL: 'http://webjetapitest.azurewebsites.net/api',
        cinemaList: ['cinemaworld', 'filmworld'],
    },
};
//# sourceMappingURL=index.js.map