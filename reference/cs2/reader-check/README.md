# Reader check

How the four reader checks from fixes/2026-10-26-cs2-content-selection.md are run, so the same copy gets the same verdict (fixes/2026-10-26-reader-check-unstable.md).

1. Export the exact canvas text of the block and number its sentences: python3 -I number.py copy.txt copy_num.txt
2. Use the KNOWN file for that block (known-*.md). Update it when an earlier block's approved copy changes. Its promises (P ids) come from his frame text above the block, read with use_figma and sorted by y, not from memory or research notes.
3. Run three fresh sub-agents with the same short brief: follow prompt.md, the KNOWN file, the COPY file and an OUT path each.
4. Combine: python3 -I aggregate.py run1.txt run2.txt run3.txt. A flag stands only when at least two runs give it. Copy is ready only when every version reads PASS.
