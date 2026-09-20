const { execSync } = require('child_process');

const passwords = ['root', 'root@123', 'root123', 'admin', 'password', '12345', 'sowmiya', 'sowmiya@123'];

for (let p of passwords) {
    try {
        console.log(`Trying ${p}...`);
        execSync(`"C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe" -u root -p"${p}" -e "SELECT 1"`, { stdio: 'ignore' });
        console.log(`SUCCESS! Password is: ${p}`);
        process.exit(0);
    } catch (e) {
        // console.log(`Failed for ${p}`);
    }
}
console.log('None of the passwords worked.');
