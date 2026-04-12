const connect_db = require('c:/Users/HP/Documents/work/ican_ezd_back_end/config/db_connection');
const UserModel = require('c:/Users/HP/Documents/work/ican_ezd_back_end/models/User');
require('c:/Users/HP/Documents/work/ican_ezd_back_end/node_modules/dotenv').config({path: 'c:/Users/HP/Documents/work/ican_ezd_back_end/.env'});

connect_db().then(() => {
    UserModel.aggregate([
        { $match: { tellerNumber: { $exists: true, $ne: '' }, bankName: "remita transaction" } }, 
        { $group: { _id: '$tellerNumber', count: { $sum: 1 }, users: { $push: '$email' } } }, 
        { $match: { count: { $gt: 1 } } }
    ]).then(res => { 
        console.log("Found RRRs used by multiple users:");
        console.log(JSON.stringify(res, null, 2)); 
        process.exit(0); 
    })
}).catch(e => { console.error(e); process.exit(1); });
