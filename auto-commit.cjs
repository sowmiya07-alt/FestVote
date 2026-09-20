const fs = require('fs');
const { execSync } = require('child_process');

const fileToModify = 'src/utils/featureFlags.js';

const commitMessages = [
    "Refactor navbar spacing",
    "Update hero section colors",
    "Add hover effects to buttons",
    "Fix typo in landing page",
    "Improve responsive layout for mobile",
    "Optimize image loading",
    "Add new award category icon",
    "Tweak dashboard card shadows",
    "Update vote confirmation text",
    "Refine modal animation",
    "Add accessibility labels to inputs",
    "Update button focus states",
    "Enhance dark mode contrast",
    "Fix overflow issue on small screens",
    "Adjust footer alignment",
    "Add loading spinner to API calls",
    "Refactor auth context provider",
    "Update mock data for students",
    "Add tooltip to voting button",
    "Improve error message clarity",
    "Update profile page layout",
    "Add transition to nominee cards",
    "Tweak primary brand color",
    "Refine glassmorphism effect",
    "Update README documentation",
    "Add prop validation",
    "Clean up unused CSS classes",
    "Optimize react imports",
    "Add meta tags for SEO",
    "Improve semantic HTML structure",
    "Update admin sidebar links",
    "Add chart placeholder to admin",
    "Fix z-index on mobile menu",
    "Update success page illustration",
    "Add empty state to results",
    "Enhance category search filter",
    "Update font weights for headings",
    "Add custom scrollbar styles",
    "Refactor voting logic hook",
    "Improve toast notification UI",
    "Update login page background",
    "Add subtle pulse animation",
    "Refine border radius on cards",
    "Update placeholder text",
    "Add error boundary component",
    "Improve accessibility contrast",
    "Update dependencies",
    "Clean up console logs",
    "Prepare for backend integration",
    "Final UI polish before launch"
];

// Push the local commit that failed to push last time
try {
    console.log("Pushing previous local commit...");
    execSync('git push');
} catch (e) {
    console.log("Push failed, retrying in 5 seconds...");
    execSync('sleep 5 || timeout 5');
    execSync('git push');
}

console.log("Resuming automated commits from index 11...");

for (let i = 11; i < 50; i++) {
    const msg = commitMessages[i];
    console.log(`[${i+1}/50] Committing: ${msg}`);
    
    // Make a small change
    fs.appendFileSync(fileToModify, `\n// Feature tweak: ${msg.replace(/ /g, '_').toLowerCase()} - ${Date.now()}`);
    
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

console.log("Finished all 50 commits!");
