require('c:/Users/HP/Documents/work/ican_ezd_back_end/node_modules/dotenv').config({path: 'c:/Users/HP/Documents/work/ican_ezd_back_end/.env'});

const mongoose = require('c:/Users/HP/Documents/work/ican_ezd_back_end/node_modules/mongoose');
const connect_db = require('c:/Users/HP/Documents/work/ican_ezd_back_end/config/db_connection');
const UserModel = require('c:/Users/HP/Documents/work/ican_ezd_back_end/models/User');
const paymentHelper = require('c:/Users/HP/Documents/work/ican_ezd_back_end/helpers/payment');
const fs = require('fs');

// Delay helper to avoid hitting Remita rate limits too hard
const delay = ms => new Promise(res => setTimeout(res, ms));

async function runReport() {
    await connect_db();
    
    // Find all confirmed users who paid via Remita
    const users = await UserModel.find({ 
        bankName: "remita transaction", 
        confirmedPayment: true,
        tellerNumber: { $exists: true, $ne: '' }
    });
    
    console.log(`Found ${users.length} confirmed Remita users. Fetching data from Remita API...`);
    
    let report = "# Full Remita Payment Validation Report\n\n";
    report += "This report compares the details stored in the database for all confirmed users who chose 'remita transaction' against the actual response returned by the Remita API for their RRR.\n\n";
    report += "| Name | Email | Phone | Expected Amount | RRR | Remita API Response | Match? |\n";
    report += "|---|---|---|---|---|---|---|\n";
    
    let count = 0;
    // Iterate sequentially to avoid overwhelming Remita API
    for (const u of users) {
        count++;
        if (count % 10 === 0) console.log(`Processed ${count}/${users.length}...`);
        
        const rrr = u.tellerNumber;
        let responseStr = "";
        let isMatch = "❓";
        
        try {
            const result = await paymentHelper.checkPaymentStatus(rrr);
            
            if (["00", "01"].includes(result?.status)) {
                // Formatting the response nicely
                responseStr = `**Sum**: ₦${result.amount}, **Email**: ${result.payerEmail}, **Name**: ${result.payerName}`;
                
                // Determine if it matches
                const emailMatch = (result.payerEmail || "").toLowerCase() === (u.email || "").toLowerCase();
                const amountMatch = Number(result.amount) >= Number(u.amount);
                
                if (emailMatch && amountMatch) {
                    isMatch = "✅ Pass";
                } else if (!emailMatch) {
                    isMatch = "❌ Cloned / Mismatch";
                } else if (!amountMatch) {
                    isMatch = "⚠️ Underpaid";
                }
                
            } else {
                responseStr = `Status: ${result?.status} (${result?.message || 'Failed'})`;
                isMatch = "❌ Unpaid";
            }
        } catch (e) {
            responseStr = `API Error: ${e.message.replace(/\|/g, '')}`; // clean out pipes for md table
            isMatch = "🛑 Error";
        }
        
        // Escape pipes in user data
        const safeName = (u.name || "").replace(/\|/g, '');
        const safeEmail = (u.email || "").replace(/\|/g, '');
        const safePhone = (u.phone || "").replace(/\|/g, '');
        
        report += `| ${safeName} | ${safeEmail} | ${safePhone} | ₦${u.amount} | \`${rrr}\` | ${responseStr} | ${isMatch} |\n`;
        
        // Small delay to prevent rate limit
        await delay(50);
    }
    
    fs.writeFileSync('C:/Users/HP/.gemini/antigravity/brain/f3388267-1d7f-484c-9b09-78612206b817/remita_validation_report.md', report);
    console.log("Report generation complete!");
    process.exit(0);
}

runReport().catch(e => { console.error(e); process.exit(1); });
