require('c:/Users/HP/Documents/work/ican_ezd_back_end/node_modules/dotenv').config({path: 'c:/Users/HP/Documents/work/ican_ezd_back_end/.env'});

const mongoose = require('c:/Users/HP/Documents/work/ican_ezd_back_end/node_modules/mongoose');
const connect_db = require('c:/Users/HP/Documents/work/ican_ezd_back_end/config/db_connection');
const UserModel = require('c:/Users/HP/Documents/work/ican_ezd_back_end/models/User');
const paymentHelper = require('c:/Users/HP/Documents/work/ican_ezd_back_end/helpers/payment');
const fs = require('fs');

async function runAudit() {
    await connect_db();
    
    const duplicates = await UserModel.aggregate([
        { $match: { tellerNumber: { $exists: true, $ne: '' }, bankName: "remita transaction", confirmedPayment: true } }, 
        { $group: { _id: '$tellerNumber', count: { $sum: 1 }, users: { $push: '$$ROOT' } } }, 
        { $match: { count: { $gt: 1 } } }
    ]);
    
    let report = "# RRR Duplication Audit Report\n\n";
    report += "This report identifies all cases of repeated RRRs, indicating the likely original owner vs. duplicated accounts based on data sourced directly from Remita.\n\n";
    
    for (const group of duplicates) {
        const rrr = group._id;
        report += `## RRR: \`${rrr}\` (Used by ${group.count} members)\n`;
        
        let remitaData = null;
        try {
            const data = await paymentHelper.checkPaymentStatus(rrr);
            remitaData = data;
        } catch (e) {
            report += `> [!WARNING]\n> Could not fetch Remita details for this RRR: ${e.message}\n\n`;
        }
        
        if (remitaData) {
            report += `**Remita Payment Record:**\n`;
            report += `- **True Payer Name**: ${remitaData.payerName}\n`;
            report += `- **True Payer Email**: ${remitaData.payerEmail}\n`;
            report += `- **Amount Paid**: ₦${remitaData.amount}\n`;
            report += `- **Transaction Date**: ${remitaData.transactionDate}\n\n`;
            
            report += `**Accounts Using This RRR:**\n`;
            
            const users = group.users.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
            
            for (const u of users) {
                const isOwnerByEmail = u.email.toLowerCase() === (remitaData.payerEmail || "").toLowerCase();
                const roleMark = isOwnerByEmail ? "👑 **[LIKELY OWNER]**" : "⚠️ **[CLONED]**";
                
                report += `- **Name**: ${u.name} \n`;
                report += `  - **Email**: ${u.email} ${roleMark}\n`;
                report += `  - **System Registered**: ${new Date(u.createdAt).toLocaleString()}\n`;
                report += `  - **Account Expected Fee**: ₦${u.amount}\n\n`;
            }
            report += `---\n\n`;
        }
    }
    
    fs.writeFileSync('c:/Users/HP/Documents/work/ican_ezd_landing/audit.md', report);
    console.log("Audit complete");
    process.exit(0);
}

runAudit().catch(e => { console.error(e); process.exit(1); });
