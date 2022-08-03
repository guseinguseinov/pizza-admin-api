import http from 'http';
import admin from './app.js';

const adminServer = http.createServer(admin);

adminServer.listen(8083, () => {
    console.log('Admin listen to http://localhost:8083');
});