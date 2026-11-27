// G6: the second close set files are tracked, clean and identical on the remote branch.
import { execSync } from 'node:child_process';
const ok=c=>{try{execSync(c,{stdio:'ignore'});return true;}catch{return false;}};
const br=execSync('git rev-parse --abbrev-ref HEAD',{encoding:'utf8'}).trim();execSync('git fetch -q origin '+br);
const files=['CLOSE-2-EXAMPLES.md','CLOSE-2-STUDY.md','CLOSE-2-GATES.md','check-close-2.mjs','check-close-2-archive.mjs','check-close-2-pushed.mjs','capture-close-2.cjs'];
const bad=files.filter(f=>!(ok(`git ls-files --error-unmatch ${f}`)&&ok(`git diff --quiet HEAD -- ${f}`)&&ok(`git diff --quiet origin/${br} -- ${f}`)));
if(bad.length){console.log('FAIL not pushed: '+bad.join(', '));process.exit(1);}console.log('CLOSE2-PUSHED-PASS');
