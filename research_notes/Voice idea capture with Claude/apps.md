# Voice-first idea capture on iPhone that connects to Claude (as of 15 Oct 2026)

Source labels: [VENDOR] = the company's own site, docs or App Store listing (marketing). [3P] = third party aggregator, directory or competitor blog. [NEWS] = press. No independent hands-on 2026 reviews comparing these apps were found; nearly all comparison content is vendor or competitor marketing.

## Which apps lead the category and what each does with a rambling memo

### Takeaway
Voicenotes and AudioPen are the two dedicated "ramble then clean up" apps that now ship an official Claude path, with Letterly a credible third. Voicenotes is the strongest fit for "link to past ideas and synthesize" because it has Ask AI over your history and a Claude connector that can search and write. AudioPen is the strongest at rewriting a ramble into clean prose but its Claude access is read-only. Cleft is the best on-device, Obsidian-oriented option but shows no Claude or MCP path. None of the apps found clearly advertise automatic linking of a new memo to related past notes; "related" happens at query time (Ask AI or Claude search), not as visible backlinks.

### Cited Findings
**Voicenotes**
- Records, transcribes, offers "Ask AI" over past recordings ("Just Ask. AI Remembers.") [VENDOR]: [voicenotes.com](https://voicenotes.com)
- Homepage does not mention auto-tags, related-note linking, Action Button, lock screen widget or Shortcuts [VENDOR]: [voicenotes.com](https://voicenotes.com)
- Platforms macOS, iOS, Windows, Android, web and watchOS; 60+ languages; claims 1 million downloads [VENDOR]: [voicenotes.com](https://voicenotes.com)
- A review praises Ask AI for querying months of recordings in plain language; a competitor notes recordings can be lost if a cloud upload fails because nothing is stored locally [3P, competitor Yaps]: [yaps.ai](https://www.yaps.ai/pt-br/blog/voicenotes-alternative)

**AudioPen**
- Records, transcribes, then rewrites in a chosen style with adjustable rewrite level (Low/Medium/High) and length; keeps original transcript; custom styles; "SuperSummaries" on Prime [VENDOR]: [audiopen.ai](https://audiopen.ai)
- Native iPhone/iPad app with a voice keyboard usable in any app; offline on-device transcription option; Apple Watch listed with no detail [VENDOR]: [audiopen.ai](https://audiopen.ai)
- Auto-tagging not described; tags appear only in Zapier routing and MCP listing [VENDOR]: [audiopen.ai](https://audiopen.ai)

**Letterly**
- AI voice note taker on iOS, Android, Mac, web and Apple Watch; custom rewrite styles; home screen widget; translation; recordings up to 90 minutes [VENDOR, App Store]: [App Store](https://apps.apple.com/us/app/letterly-ai-note-taker/id6464049772)

**Cleft Notes**
- Transcribes into structured notes (headings, checklists, bullets); App Store listing claims on-device transcription and encrypted storage; Mac, iPhone, iPad [VENDOR, App Store]: [App Store](https://apps.apple.com/app/id6479458038); [theaireport.ai](https://www.theaireport.ai/tooldatabase/cleft-notes)
- Integrations listed as Notion, Obsidian, Apple Notes, Shortcuts and Zapier; how the Obsidian link works is not documented in what I found [3P/VENDOR]: [App Store](https://apps.apple.com/hn/app/cleft-ai-voice-memos/id6479458038)

**Tana (voice memos)**
- Voice memos transcribed server-side and can be auto-structured with supertags and fields; 91 languages; original audio kept; 1 hour cap per recording; lock screen and home screen widgets for one-tap capture; costs about 50 AI credits per 15 minutes [VENDOR docs]: [Tana docs](https://tana.inc/docs/mobile-voice-memos)

**Apple Notes / Voice Memos (built in)**
- Notes can record audio, transcribe it, and generate an Apple Intelligence summary of the transcript; recorded iPhone calls land in a Call Recordings folder [VENDOR, Apple]: [Apple support](https://support.apple.com/en-al/guide/mac-help/mchl2102c2ae/mac)
- Transcription works without Apple Intelligence (iPhone 12 or later); summaries need Apple Intelligence; summary in iOS 26 or later [3P]: [apfelpatient.de](https://www.apfelpatient.de/en/tips-tricks/apple-notes-now-with-audio-recording-and-automatic-transcription); [AT&T device support](https://www.att.com/device-support/article/142344/apple/iphone-air/)
- That guide says transcription accuracy improves noticeably in iOS 27 [3P, unverified]: [apfelpatient.de](https://www.apfelpatient.de/en/tips-tricks/apple-notes-now-with-audio-recording-and-automatic-transcription)
- No auto-tagging, rewriting or cross-note linking is documented; no official Claude connector found. A community MCP server exists for Apple Voice Memos on macOS only [3P, GitHub]: [jwulff/apple-voice-memo-mcp](https://github.com/jwulff/apple-voice-memo-mcp)

**Meeting/pendant tools (adjacent, not built for idea capture)**
- Otter: official remote MCP at mcp.otter.ai, reported listed in Claude's directory April 2026, read-only (search, fetch, get_user_info) [3P]: [mcpservers.org](https://mcpservers.org/remote-mcp-servers/otter-ai); [tactiq.io](https://tactiq.io/learn/ai-meeting-notetaker-with-claude-connector). One source contradicted this, saying Otter has no MCP server; the more specific multi-source claim of an official server looks current [3P]: [circleback.ai](https://circleback.ai/blog/ai-meeting-notetakers-mcp-claude-chatgpt)
- Granola: Claude connector launched February 2026, verified in Claude's Connectors Directory, OAuth [VENDOR]: [Granola blog](https://www.granola.ai/blog/granola-mcp); [Granola docs](https://docs.granola.ai/help-center/sharing/integrations/mcp)
- Plaud (hardware recorder): support page says Plaud is listed in Claude's Connector Directory; a comparison says its MCP is read-only and needs Cloud Sync on. The Plaud page returned 403 when fetched so I could not verify directly [VENDOR via search snippet; 3P]: [Plaud support](https://support.plaud.ai/hc/en-us/articles/57751078986265-Plaud-MCP); [mrktcorrect.com](https://mrktcorrect.com/blog/plaud-vs-pocket-vs-otter)

**Discontinued / flagged**
- Limitless (Pendant) acquired by Meta 5 Dec 2025; Pendant sales to new customers ended; existing owners supported for at least a year (roughly to Dec 2026) and moved to an Unlimited plan free; Rewind capture disabled 19 Dec 2025; service ended in EU and UK [NEWS]: [9to5Mac](https://9to5mac.com/2025/12/05/rewind-limitless-meta-acquisition/); [hedy.ai, competitor](https://www.hedy.ai/post/meta-acquires-limitless-ai-privacy/)

### Inferences
- For "ramble, then Claude synthesizes later," the real linking engine is Claude itself via MCP search, not the capture app. That makes the quality of the connector (search plus full transcript fetch) more important than in-app tagging.
- Voicenotes is the only dedicated idea-capture app found whose Claude connector can also write notes back, which allows a loop like "Claude, file this synthesis as a note."
- Tana is the only one with documented automatic structuring (supertags and fields) at capture time, but it costs AI credits and no Claude connector was found.

### Gaps
- TalkNotes, Oasis, Mem, Reflect: no current 2026 information found on features, MCP or status. Mem and Reflect MCP searches returned nothing relevant (a "Mem0" MCP exists but is a different product).
- Notion AI voice capture on iPhone: no source found describing mobile voice transcription in Notion.
- No source documented automatic "related past notes" linking in any dedicated voice app.

## Speed to record (lock screen, Action Button, Apple Watch, Shortcuts, Siri)

### Takeaway
Apple Watch apps are confirmed for Voicenotes, AudioPen and Letterly; lock screen widget confirmed only for Tana; home screen widget for Letterly; Shortcuts for Cleft. Action Button and Siri support were not documented by any vendor in what I found. Any app exposing a Shortcut or App Intent can be bound to the Action Button, but that is inference.

### Cited Findings
- Voicenotes: watchOS app; no mention of Action Button, lock screen widget or Siri/Shortcuts on homepage [VENDOR]: [voicenotes.com](https://voicenotes.com)
- AudioPen: Apple Watch listed; iOS voice keyboard works inside any app [VENDOR]: [audiopen.ai](https://audiopen.ai)
- Letterly: Apple Watch and home screen widget [VENDOR, App Store]: [App Store](https://apps.apple.com/us/app/letterly-ai-note-taker/id6464049772)
- Tana: lock screen and home screen widgets for one-tap capture [VENDOR docs]: [Tana docs](https://tana.inc/docs/mobile-voice-memos)
- Cleft: Shortcuts listed among integrations [3P/VENDOR]: [App Store](https://apps.apple.com/hn/app/cleft-ai-voice-memos/id6479458038)

### Inferences
- Shower use case: Apple Watch capture (Voicenotes, AudioPen, Letterly) is the most practical hands-wet route; check water rating and whether the watch app records offline and syncs later.

### Gaps
- No vendor documentation found for Action Button or Siri phrases for any of these apps. App Store listings or in-app testing would be needed.

## Claude integration specifics (MCP, connector directory, export, Zapier)

### Takeaway
Three dedicated voice-capture apps have official MCP servers usable from Claude: Voicenotes (in Claude's connector directory, read and write), AudioPen (read-only, Prime only) and Letterly (hosted MCP, search/rewrite/translate/create). Meeting tools Otter, Granola and Plaud also have Claude connectors but are read-only and meeting-oriented. Cleft and Apple Notes have no official Claude path; they reach Claude only through Obsidian/Notion export or Zapier.

### Cited Findings
**Voicenotes**
- Official hosted MCP; listed in Claude's connector directory (web: prefilled link; desktop: Browse Connectors); Claude Code via `claude mcp add voicenotes --transport http`; OAuth, no API key [VENDOR, page dated 10 Jul 2026]: [Voicenotes help](https://help.voicenotes.com/en/articles/14336494-voicenotes-mcp)
- Tools: search_notes (semantic), list_notes (by date or tags), get_transcript, create_text_note (with tags) [VENDOR]: [Voicenotes help](https://help.voicenotes.com/en/articles/14336494-voicenotes-mcp)
- Claude side requires Pro, Max, Team or Enterprise Claude plan for custom connectors; ChatGPT works on all plans [VENDOR]: [Voicenotes help](https://help.voicenotes.com/en/articles/14336494-voicenotes-mcp)
- MCP publicly available as of 25 Mar 2026; once connected on web/desktop it also works in Claude mobile apps [VENDOR, via search]: [Voicenotes help](https://help.voicenotes.com/en/articles/14336494-voicenotes-mcp)
- MCP and "advanced integrations (Zapier, Notion, Claude, ChatGPT, WhatsApp)" are Pro-tier features on Voicenotes [VENDOR]: [Voicenotes pricing](https://voicenotes.com/pricing)
- A separate older article covers connecting Claude Code / Cowork via a skill doc and auth token, now superseded [VENDOR]: [Voicenotes help](https://help.voicenotes.com/en/articles/14107996-connect-claude-code-cowork-to-your-voicenotes)
- Community servers also exist (samlevan/voicenotes-mcp; one on Glama built on a reverse engineered API) [3P]: [GitHub](https://github.com/samlevan/voicenotes-mcp); [Glama](https://glama.ai/mcp/servers/rk77rvkrje)
- Zapier lists Voicenotes MCP [3P]: [Zapier](https://zapier.com/ja/mcp/voicenotes)

**AudioPen**
- "AudioPen MCP" on Prime gives Claude and ChatGPT read-only access: search notes, list tags and folders, read full note with transcript; cannot create, edit or delete [VENDOR]: [audiopen.ai](https://audiopen.ai)
- Zapier (sends note on save, e.g. route by tag) and JSON webhooks; Notion integration page linked; no general Markdown export described [VENDOR]: [audiopen.ai](https://audiopen.ai)

**Letterly**
- Hosted MCP at mcp.letterly.app/mcp, OAuth; search, rewrite, translate and create notes from Claude, ChatGPT, Cursor [VENDOR]: [letterly.app/mcp](https://letterly.app/mcp); [Letterly blog](https://letterly.app/blog/how-to-chat-with-your-notes-in-claude/)
- Zapier integration: one trigger, zero actions (third-party listing) [3P]: [hackceleration.com](https://hackceleration.com/resources/integrations/zapier/letterly)

**Notion (as a destination)**
- Official Notion MCP at mcp.notion.com/mcp with search, fetch, create/update pages and databases; one guide says Claude Pro and above [3P]: [contextbolt.com](https://contextbolt.com/blog/notion-mcp/); [anythingmcp.com](https://anythingmcp.com/ja/guides/connect-notion-to-claude)

**Cleft**
- No source connects Cleft to Claude or MCP; reachable via its Obsidian, Notion or Zapier integrations [3P]: [alternativeto.net](https://alternativeto.net/software/cleft-notes/about)

### Inferences
- Lowest-friction stack that meets "Claude can read, search and synthesize": Voicenotes Pro plus Claude Pro, connector added once from the directory. Second: AudioPen Prime (better rewriting, read-only to Claude). Third: Cleft into Obsidian or Notion, then Claude reads the Notion MCP or a local Obsidian vault via filesystem MCP.
- Plan stacking matters: both the capture app's paid tier and a paid Claude plan are required for every official path found.

### Gaps
- Could not open Anthropic's connector directory directly to confirm listings for Voicenotes, Letterly, AudioPen, Plaud and Otter; directory status comes from vendor or 3P pages (Voicenotes and Granola are vendor-confirmed).
- No independent test of MCP search quality on large note histories.

## Pricing, privacy and company stability

### Takeaway
Voicenotes and AudioPen both state recordings are never used for training; AudioPen deletes voice audio from servers within 48 hours and offers on-device transcription; Cleft claims on-device transcription. Voicenotes pricing on its own page ($9/user/month Pro) conflicts with older third-party figures (~$14.99). Limitless is the cautionary tale for hardware pendants.

### Cited Findings
- Voicenotes: Basic free (100 weekly transcription minutes, 30-day history); Pro $9/user/month (unlimited minutes and history, MCP, integrations); Enterprise $24/user/month [VENDOR]: [Voicenotes pricing](https://voicenotes.com/pricing). Contradicted by ~$14.99/month Pro [3P, competitor]: [yaps.ai](https://www.yaps.ai/pt-br/blog/voicenotes-alternative). Likely the $9 is an annual-billing per-month rate; unverified.
- Voicenotes: never used to train AI, third parties such as OpenAI or Anthropic cannot train on data; SOC 2 (Type II on homepage) via Vanta; GDPR; encrypted at rest [VENDOR]: [Voicenotes pricing](https://voicenotes.com/pricing); [voicenotes.com](https://voicenotes.com)
- AudioPen: Free (3-minute recordings); Prime $33 per 3 months, $99/year, $159/2 years; 15-minute recording cap on Prime [VENDOR]: [audiopen.ai](https://audiopen.ai). Older 3P figures ($75/year; $15 to $25/month) conflict and look outdated: [toolquestor.com](https://toolquestor.com/vs/audiopen-vs-voicenotes); [yaps.ai](https://www.yaps.ai/es/blog/las-7-mejores-alternativas-de-audiopen-2026-privadas-y-sin-conexion.md)
- AudioPen privacy: audio deleted from servers within 48 hours, voice typing audio never saved, never used to train AI, offline transcription keeps audio on device but rewrite needs a connection [VENDOR]: [audiopen.ai](https://audiopen.ai)
- Cleft: freemium; one listing gives Plus at $6.99/month or $39.99/year [3P, may be outdated]: [theaireport.ai](https://www.theaireport.ai/tooldatabase/cleft-notes)
- Tana: voice memo transcription consumes AI credits (~50 per 15 minutes) [VENDOR]: [Tana docs](https://tana.inc/docs/mobile-voice-memos)
- Limitless shutdown details as above [NEWS]: [9to5Mac](https://9to5mac.com/2025/12/05/rewind-limitless-meta-acquisition/)

### Inferences
- AudioPen's 15-minute cap on Prime is a real limit for long thinking-out-loud sessions; Letterly's 90 minutes and Tana's 1 hour are longer.
- Voicenotes' expansion into meetings, teams, SSO and CRM integrations suggests it is commercially growing (stability signal), while AudioPen remains a small indie product.

### Gaps
- Letterly and Cleft current official pricing and privacy policies not verified.
- No funding or headcount data found for Voicenotes, AudioPen, Letterly or Cleft.

## Importing existing Apple Notes

### Takeaway
None of the dedicated voice apps documents an Apple Notes import. The practical route is Obsidian's official Importer (macOS only) to Markdown, then Claude reads the vault; Reflect needs an export script first.

### Cited Findings
- Obsidian Importer converts Apple Notes to Markdown, macOS only, skips locked notes, does not delete originals [VENDOR]: [Obsidian help](https://obsidian.md/help/import/apple-notes)
- A reviewer importing 400+ notes saw 36 fail with no clear reason [3P]: [MacStories](https://www.macstories.net/stories/obsidians-importer-plugin-lets-you-move-your-apple-notes-to-any-note-taking-app-that-supports-markdown/)
- Reflect requires exporting Apple Notes to HTML via a script, then importing [VENDOR]: [Reflect academy](https://reflect.academy/import-export-backups)

### Inferences
- If old Apple Notes must be searchable by Claude alongside new memos, a split works: Apple Notes to Obsidian or Notion once, new voice memos in Voicenotes, Claude connected to both.

### Gaps
- Voicenotes, AudioPen, Letterly, Mem: no Apple Notes import documentation found. Voicenotes and AudioPen do support audio file uploads (AudioPen Prime up to 100 files per 4 weeks), which covers old Voice Memos audio but not Notes text [VENDOR]: [audiopen.ai](https://audiopen.ai); [Voicenotes pricing](https://voicenotes.com/pricing)
