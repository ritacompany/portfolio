# Getting an Apple Notes backlog out and having Claude triage it (as of October 2026)

## Which Apple Notes MCP servers or Claude connectors exist, are they read-only or read-write, maintained, safe?

### Takeaway
There appears to be a first-party Claude Desktop extension ("Read and Write Apple Notes") that reads, searches and writes notes locally, but it is confirmed by only one secondary source. The best-known community server, sirmews/apple-notes-mcp, is read-only and was archived in August 2025, so treat it as stale. Every live-access route needs macOS permissions (Automation or Full Disk Access) and sends the note text it reads to Claude.

### Cited Findings
- Anthropic runs an official, curated desktop extensions directory inside Claude Desktop under Settings > Extensions ([Anthropic support](https://support.anthropic.com/en/articles/10065433-installing-claude-for-desktop)). That page does not name Apple Notes.
- A July 23, 2026 Substack post describes a free extension called "Read and Write Apple Notes" and calls it an official Anthropic extension. It installs via Settings > Extensions > Browse, searching "Notes". It works on free and paid plans ([iProductivity Substack](https://iproductivity.substack.com/p/apple-notes-finally-got-smart-with)).
- Per that post, the extension can create notes, append to existing notes, search by meaning (even with Notes closed), open and summarize notes, including handwritten Apple Pencil notes. Deletion is not mentioned. Access runs through macOS Automation and can be revoked under System Settings > Privacy & Security > Automation. A commenter reported that line breaks collapsed when Claude wrote to Notes ([iProductivity Substack](https://iproductivity.substack.com/p/apple-notes-finally-got-smart-with)).
- The same post says a separate claude.ai Notes connector exists, and that it needs a paid plan ([iProductivity Substack](https://iproductivity.substack.com/p/apple-notes-finally-got-smart-with)). A second third-party blog also says Anthropic documents Apple Notes access as a desktop extension ([usecarly](https://www.usecarly.com/blog/claude-apple-notes-integration/)). I could not find either one in Anthropic's own documentation.
- sirmews/apple-notes-mcp reads the local NoteStore SQLite database. Its tools are get-all-notes, read-note and search-notes. It needs Full Disk Access, cannot create or edit notes, cannot handle encrypted (locked) notes, and does not read attachment content or checklist state. It has 131 stars and was **archived by its owner on August 24, 2025** ([GitHub](https://github.com/sirmews/apple-notes-mcp)). Some directory listings wrongly call it read-write ([mcp.directory](https://mcp.directory/servers/apple-notes)).
- Other community servers are listed in directories, all macOS-only. JonathanRReed's Apple-MCPs (PyPI) supports read, create, update, move and delete. disco-trooper/apple-notes-mcp (TypeScript) adds semantic search and CRUD, single account only. Dan8Oren/mcp-apple-notes offers local semantic search and RAG with no API keys (about 8 stars). Siddhant-K-code/mcp-apple-notes uses AppleScript and needs Node 20+. arslankhanali/apple-notes-mcp is a Python CRUD server ([PyPI apple-mcp-notes](https://pypi.org/project/apple-mcp-notes/); [enterprisedna disco-trooper](https://enterprisedna.co/directories/mcp/disco-trooper-apple-notes-mcp); [enterprisedna dan8oren](https://enterprisedna.co/directories/mcp/dan8oren-mcp-apple-notes); [playbooks siddhant](https://playbooks.com/mcp/siddhant-k-code-apple-notes)). These details come from directory listings, not the repositories.

### Inferences
- For a one-time backlog triage, live MCP access is the wrong tool. An export gives Claude a stable snapshot with dates and folders, and nothing can be edited or deleted by accident. Save live access for ongoing capture, such as appending a triage summary back into Notes.
- If you do use a read-write server on the backlog, its delete and update tools can destroy notes. Prefer a read-only server, or deny those tools, until the export is backed up.
- Full Disk Access granted to a terminal or MCP client gives it far more than Notes, which makes it the bigger privacy risk. AppleScript and Automation access is narrower.

### Gaps
- I could not confirm the official Anthropic "Read and Write Apple Notes" extension, or its exact tool list, on an Anthropic page. Checking Settings > Extensions in Claude Desktop would settle it.
- I did not verify the maintenance status (last commit dates) of the non-archived community servers.
- No security audit of any Apple Notes MCP server turned up.

## Best export path that keeps creation dates and folders, and whether it works with locked notes

### Takeaway
Exporter (a free Mac App Store app) is the simplest route that explicitly preserves creation and modification dates, folders and attachments, and it was updated in 2025 and 2026. The Obsidian Importer is the best route if the notes will live in Obsidian, but it skips locked notes and its docs do not state date handling. For locked notes, unlock them first; only the forensic parser decrypts them with a known password.

### Cited Findings
- **Exporter (Chintan Ghate, Mac App Store):** exports to Markdown or HTML. "Creation & modification dates of notes are preserved." It saves notes in folders named after their Notes folders and supports exporting all attachments. A 2025 review says PDFs, call recordings, images and Word documents export with the note. Free, with a $4.99 in-app Notebook Filter. Version 4.0.0 (Sept 26, 2025) added todo state, links, hashtags, mentions and scans. 4.0.5 (Oct 31, 2025) fixed macOS 26 issues. 4.0.8 (June 8) fixed export of locked notes with a slash in the title ([App Store](https://apps.apple.com/us/app/exporter/id1099120373)).
- **Obsidian Importer (Apple Notes):** Mac only, not iOS. It supports "virtually all Apple Notes content types" including tables, images, drawings, scans, PDFs and iOS 17 links. "Any locked notes will be skipped" unless unlocked first. Scans export as uncropped images, cropped images or PDFs depending on when they were made ([Obsidian Help](https://obsidian.md/help/import/apple-notes)). macOS asks for access to the Notes data folder during import ([Obsidian Help](https://obsidian.md/help/import/apple-notes)). Obsidian announced the feature on October 19, 2023 for migration and backup ([Obsidian blog](https://obsidian.md/blog/apple-notes-export/)).
- **kzaremski/apple-notes-exporter (GitHub, about 740 stars, v2.1):** exports to many formats including Markdown, JSON, JSONL, CSV and ENEX. Folder output "mirrors Apple Notes". Attachments are included by default. "Note creation and modification dates are preserved inside archives", which may not cover plain folder exports. Locked notes are not mentioned ([GitHub](https://github.com/kzaremski/apple-notes-exporter)).
- **storizzi/notes-exporter (Python, AppleScript-based):** exports to HTML, text, Markdown, PDF and DOCX with images and attachments. Supports incremental export, two-way sync back to Notes and optional local semantic search via Qdrant and Ollama. About 241 stars, last push March 2026, per aggregators only ([gittrend](https://gittrend.io/repo/storizzi/notes-exporter); [sourcepulse](https://www.sourcepulse.org/projects/31056283)).
- **threeplanetssoftware/apple_cloud_notes_parser (Ruby, forensic):** reads a Mac Notes folder, an iTunes or physical backup, or a single NoteStore.sqlite. It works on a copy and leaves the original untouched. Outputs HTML, four CSVs (accounts, embedded objects, folders, notes) and JSON. Can write one HTML file per note in a folder tree that mirrors Notes. Decrypts locked notes when the note password is supplied, but not notes protected by the device passcode (iOS 16+). Handles iOS 9 through 26 data and needs Ruby 3.0+ ([GitHub](https://github.com/threeplanetssoftware/apple_cloud_notes_parser)).
- **Audio:** since iOS 18, Notes records audio with a transcript. The transcript can be copied out, or added to the note body as text from the recording's menu ([Popular Science](https://www.popsci.com/diy/how-to-record-audio-make-transcripts-iphone); [9to5Mac](https://9to5mac.com/2024/08/01/audio-transcription-in-ios-18-how-to/)).

### Inferences
- Recommended path: unlock any locked notes you want included, run Exporter to Markdown (folders plus dates plus attachments), then point Claude Code at the folder. Use the Obsidian Importer only if Obsidian becomes the long-term home.
- Audio recordings export as audio files at best. Transcripts are reliably usable by Claude only if they were added into the note body before export. For a backlog with many voice memos, adding transcripts to the note body is the step that makes them triageable.
- Run any export on the Mac with iCloud sync finished so iPhone-only notes are included.

### Gaps
- Whether the Obsidian Importer writes creation dates (into frontmatter or file metadata) is not stated in its help page.
- Whether any exporter carries audio transcripts as text was not confirmed.
- Exporter's handling of locked notes (skip or prompt) is not documented beyond the slash-in-title fix.

## What does a good LLM triage output look like and how often should review happen?

### Takeaway
The proven pattern is embed, cluster, then have an LLM name and merge clusters and flag near-duplicates, with a human checking the labels. For fragmentary notes, embeddings beat bag-of-words topic models, and an LLM merge step fixes over-splitting. Review cadence evidence is practitioner-based: a single trusted inbox that is drained on a fixed rhythm, with ideas that stay dull after a few looks archived.

### Cited Findings
- BERTopic is the standard baseline: transformer embeddings, dimensionality reduction, HDBSCAN clustering, then class-based TF-IDF labels ([BERTopic paper](https://ar5iv.labs.arxiv.org/html/2203.05794)). Its cluster count is set by the data's density, not chosen in advance ([TopiCLEAR, arXiv 2512.06694](https://arxiv.org/pdf/2512.06694)).
- Short texts defeat LDA and NMF because there is too little word co-occurrence ([arXiv 2509.19365](https://arxiv.org/html/2509.19365v1)). BERTopic over-splits noisy, sparse data into many overlapping topics. An LLM that iteratively merges the most similar topics to a target count fixes this ([arXiv 2509.19365](https://arxiv.org/pdf/2509.19365v1)).
- One deduplication recipe: embed, run average-linkage hierarchical clustering, merge clusters above a similarity threshold (0.85 in that paper, tuned by inspection) and have an LLM write one canonical name per merged group ([arXiv 2601.05265](https://arxiv.org/pdf/2601.05265)).
- Practitioner advice: validate automatic labels by hand ([Jeff Bullas forum](https://www.jeffbullas.com/thread/topic-modeling-vs-llm-clustering-for-text-whats-the-difference-and-when-to-use-each/)).
- Matuschak's writing inbox: capture fast into one place kept separate from developed notes, then drain it with a reliable practice. He reviews it in a morning writing session, develops whatever stands out and archives notes that stay uninteresting after a few looks. He calls Inbox Zero-style triage "too brittle" ([Matuschak](https://notes.andymatuschak.org/A_writing_inbox_for_transient_and_incomplete_notes)). Inboxes only work if you trust how they are drained, and should not be split across places ([Matuschak](https://notes.andymatuschak.org/§Inboxes_and_attention_management)).
- Forte's CODE (Capture, Organize, Distill, Express) treats Express as the point. PARA sorts by actionability: Projects, Areas, Resources, Archives ([mmapped book summary](https://mmapped.blog/posts/16-building-a-second-brain)).

### Inferences
- A good triage output for a backlog of a few hundred to a few thousand notes, inferred from the above:
  1. **Index:** one row per note with source file, created date, folder, a one-line gist and a type (idea, task, reference, journal, junk).
  2. **Theme clusters:** an LLM-named cluster with member note links, the date span (an idea that recurs over years is a strong signal) and a 2 to 3 sentence synthesis of what the cluster is circling.
  3. **Duplicate groups:** near-duplicates merged under one canonical statement, keeping every source link.
  4. **Surfaced ideas:** a short ranked list (10 to 20 at most), each with why it is promising, the next concrete step and the notes it came from.
  5. **Actionables:** tasks pulled out separately so they do not pollute the idea clusters.
  6. **Archive candidates:** shown for a human yes, never deleted automatically.
- At this scale, Claude can do clustering without a separate embedding pipeline by batching notes and running a merge pass. Embeddings start to matter in the thousands or for repeatable runs.
- Cadence: one big backlog pass, then a light weekly drain of the new inbox, plus a monthly re-cluster so recurring ideas surface. The weekly and monthly numbers are a design choice, not an evidence-based figure.

### Gaps
- No study found that evaluates LLM triage specifically on personal note archives.
- No empirical evidence found on the best idea review cadence; Forte's weekly review guidance was not located in a primary source.

## Research on incubation, idea capture and review cadence

### Takeaway
Incubation is real but modest: stepping away helps, especially for divergent "generate ideas" problems and after a solid stretch of work on the problem. Low-demand activity like showering is plausibly helpful, but the mind-wandering mechanism has not replicated. Writing a concrete plan, not finishing, is what quiets open loops, which argues for capture that ends with a next step.

### Cited Findings
- Sio and Ormerod's 2009 meta-analysis of 117 studies found a positive incubation effect, mean d = 0.29 (low to medium). It was larger for divergent thinking than for linguistic or visual insight problems, larger after longer preparation, and smaller when the break was filled with a highly demanding task. Breaks with an undemanding task beat demanding tasks or no task ([Sio and Ormerod 2009](https://www.Gwern.net/doc/psychology/writing/2009-sio.pdf); [PMC review](https://pmc.ncbi.nlm.nih.gov/articles/pmc3990058)).
- Baird et al. (2012) found that an undemanding incubation task produced more creative improvement and more mind wandering. That result did not replicate, and later studies found no link between incubation mind wandering and creative improvement, so the mechanism remains unclear ([Frontiers review](https://frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2014.00215/full); [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4956660)). A preregistered study of mind wandering as the mechanism exists ([PMC12241419](https://pmc.ncbi.nlm.nih.gov/articles/PMC12241419/)); I did not retrieve its result.
- Masicampo and Baumeister (2011, *JPSP*), "Consider It Done!": unfulfilled goals produced intrusive thoughts and interfered with unrelated tasks. Making a specific plan (when, where, how) removed those effects without completing the goal ([Psychology Today](https://www.psychologytoday.com/us/blog/tech-support/201310/why-your-to-do-list-drives-you-crazy); [Examine](https://examine.com/conditions/focus-attention/faq/how-could-lack-of-planning-affect-focus-and-attention); [SpaceDaily](https://www.spacedaily.com/j-v-the-zeigarnik-effect-helps-explain-why-unfinished-goals-can-feel-louder-than-completed-ones-but-modern-research-suggests-the-minds-pull-toward-open-loops-is-far-more-conditional-than-the/)). These are secondary sources, not the original paper.
- Matuschak: most people use notes as a bucket for scratch thoughts and end up with "a pile of dissociated notes" after a year ([Matuschak](https://notes.andymatuschak.org/zNQV445UEcyLXVsRVgoVSfv)); most people take only transient notes ([Matuschak](https://notes.andymatuschak.org/zKGjQtsTKgscAoq271ZzKqw)).

### Inferences
- Design changes this research supports:
  - **Capture friction near zero, at the moment of insight.** Insight after a low-demand break is fleeting, so a voice capture (Notes audio with transcript, or dictation) beats typing. For a verbal processor, speaking the idea is also the thinking.
  - **End each capture with a one-line next step where possible.** This is the Masicampo and Baumeister mechanism: a plan closes the loop so the mind lets go.
  - **One inbox, a drained loop.** The backlog exists because there was capture without review. The fix is a scheduled drain (Claude-assisted) plus keeping the archive and the inbox separate.
  - **Feed incubation on purpose.** Since preparation length boosts incubation, review sessions that re-read a cluster before a walk or shower can seed the next insight. This is an extrapolation, not tested.

### Gaps
- No peer-reviewed study specific to the "shower effect" was retrieved, only the general incubation and mind-wandering literature.
- No research found on "verbal processors" as a construct, or on voice versus typed capture for idea retention.
- No studies found comparing PARA, Zettelkasten or inbox-zero systems on outcomes.
