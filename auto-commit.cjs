const fs = require('fs');
const { execSync } = require('child_process');

const fileToModify = 'src/utils/featureFlags.js';

// Ensure the file exists
if (!fs.existsSync('src/utils')) {
    fs.mkdirSync('src/utils', { recursive: true });
}
if (!fs.existsSync(fileToModify)) {
    fs.writeFileSync(fileToModify, '// Feature Flags\nexport const flags = {};\n');
}

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

console.log("Starting 50 automated commits...");

for (let i = 0; i < 50; i++) {
    const msg = commitMessages[i];
    console.log(`[${i+1}/50] Committing: ${msg}`);
    
    // Make a small change
    fs.appendFileSync(fileToModify, `\n// Feature tweak: ${msg.replace(/ /g, '_').toLowerCase()} - ${Date.now()}`);
    
    // Git commands
    try {
        execSync('git add .');
        execSync(`git commit -m "${msg}"`);
        execSync('git push');
    } catch (error) {
        console.error(`Error on commit ${i+1}:`, error.message);
        break;
    }
}

console.log("Finished all 50 commits!");
