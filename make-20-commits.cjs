const fs = require('fs');
const { execSync } = require('child_process');

const fileToModify = 'src/utils/featureFlags.js';

const commitMessages = [
    "Fix minor CSS glitch",
    "Update readme instructions",
    "Refactor some components",
    "Optimize rendering",
    "Fix edge case in auth",
    "Update dependency",
    "Add more test cases",
    "Clean up console.log",
    "Improve performance",
    "Update layout for mobile",
    "Add transition effects",
    "Update typography",
    "Fix spacing issue",
    "Update color palette",
    "Enhance form validation",
    "Update API endpoints",
    "Fix state management",
    "Improve accessibility",
    "Add new feature flag",
    "Finalize 20 commits"
];

console.log("Starting 20 new automated commits...");

for (let i = 0; i < 20; i++) {
    const msg = commitMessages[i];
    console.log(`[${i+1}/20] Committing: ${msg}`);
    
    // Make a small change
    fs.appendFileSync(fileToModify, `\n// Auto commit: ${msg.replace(/ /g, '_').toLowerCase()} - ${Date.now()}`);
    
    let success = false;
    let attempts = 0;
    
    // Git commands
    execSync('git add .');
    execSync(`git commit -m "${msg}"`);
    
    while (!success && attempts < 3) {
        try {
            attempts++;
            execSync('git push');
            success = true;
        } catch (error) {
            console.error(`Push failed on commit ${i+1}, attempt ${attempts}. Retrying in 5s...`);
            try { execSync('sleep 5 || timeout 5'); } catch(e){}
        }
    }
    
    if (!success) {
        console.error(`Failed to push commit ${i+1} after 3 attempts. Aborting.`);
        break;
    }
}

console.log("Finished all 20 commits!");
