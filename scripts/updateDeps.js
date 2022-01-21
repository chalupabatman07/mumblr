const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function getAllPackagePaths() {
  process.chdir(path.join(__dirname, '../'));
  const lines = (await execAsync('yarn lerna list --parseable --all', { stdio: 'pipe' })).stdout.toString().split('\n');
  return lines.filter(line => {
    try {
      const stat = fs.statSync(line);
      return stat.isDirectory();
    } catch (error) {}
    return false;
  });
}

async function upgradeDeps() {
  const packagePaths = await getAllPackagePaths();
  packagePaths.forEach(p => {
    execSync(`yarn ncu -u --cwd ${p}`, { stdio: 'inherit' });
  });
}

upgradeDeps();
