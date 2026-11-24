// G4: the study notes, checks and ledger are tracked, unchanged locally and identical on the remote branch.
import { execSync } from 'node:child_process';
const ok=c=>{try{execSync(c,{stdio:'ignore'});return true;}catch{return false;}};
execSync('git fetch -q origin claude/design-system-cs-draft');
const files=['STUDY.md','GATES.md','check-archive.mjs','check-study.mjs','check-pushed.mjs','capture-archive.cjs'];
const bad=files.filter(f=>!(ok(`git ls-files --error-unmatch ${f}`)&&ok(`git diff --quiet HEAD -- ${f}`)&&ok(`git diff --quiet origin/claude/design-system-cs-draft -- ${f}`)));
if(bad.length){console.log('FAIL not pushed: '+bad.join(', '));process.exit(1);}console.log('PUSHED-PASS');
