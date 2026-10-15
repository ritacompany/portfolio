# DIY pipelines: iPhone voice recording to organized notes Claude can work with (October 2026)

Scope note: research done 15 Oct 2026. Anthropic sources are official support and docs pages. Most Obsidian, Shortcuts and automation material is community or vendor content and is labeled as such. No source gave verified per-month costs for any full pipeline, so cost is described qualitatively.

## Ranked pipelines (setup effort and ongoing manual work)

Ranking is an inference built from the cited findings in the sections below.

1. **Claude app only (dictation or voice mode into a dedicated Project).** Setup: minutes. Ongoing: you open the app, pick the Project, talk. No transcript file exists outside Claude, so other tools cannot read it, but Claude chat search and memory can. Lowest effort, weakest "store".
2. **Action Button Shortcut using the built-in Ask Claude action, then save the result to an iCloud Obsidian folder.** Setup: 20 to 40 minutes in Shortcuts. Ongoing: zero beyond pressing the button and speaking. Uses subscription usage, no API key. Main risk: the Ask Claude action output handling is not fully documented, and the iOS 26 Transcribe Audio action has a reported bug.
3. **Shortcut records and transcribes, appends raw text to an Obsidian inbox in iCloud; a Claude Code Desktop local scheduled task cleans, tags, links and writes a daily or weekly digest.** Setup: 1 to 2 hours. Ongoing: Mac must be awake with Claude Desktop open at run time; occasional review. Best fit for this user (iPhone + Mac + comfortable with Claude Code). Raw capture is robust because nothing AI-dependent runs on the phone.
4. **Obsidian plugin capture (Voice MD or Quick Voice Note) launched from the Action Button, plus Claude Code or an Obsidian MCP server on the Mac.** Setup: 1 to 2 hours. Ongoing: low. Depends on community plugins and an OpenAI key for transcription in Voice MD.
5. **Notion as the store via the official Notion connector, with a cloud Claude Code routine processing the inbox.** Setup: 1 to 2 hours. Ongoing: none once running; works with the Mac off. Getting audio or text into Notion from the phone still needs a Shortcut or third-party app.
6. **Zapier / Make / n8n chain (folder or Telegram bot, Whisper, Claude, Notion).** Setup: 2+ hours, paid tiers or self-hosting, separate API keys. Ongoing: monitoring breakage across several services. Highest maintenance.

## Claude's own mobile app as an idea inbox (voice, dictation, Projects, memory, connectors)

### Takeaway
The Claude iOS app can capture by dictation or voice mode, from the Action Button, Lock Screen, Control Center, widget or Siri, and a Project can act as a topic inbox with its own memory and searchable history. It is a fine capture surface but not a portable note store: content lives in chat history, readable by Claude (search, memory) but not by other tools.

### Cited Findings
- Dictation turns speech into text that you send as a typed prompt; voice mode is a spoken back and forth where Claude talks back and can use connected tools. Dictation is available on all plans (Free, Pro, Max, Team, Enterprise). Source: [Use dictation on Claude Mobile](https://support.claude.com/en/articles/10065434-use-dictation-on-claude-mobile); [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)
- Voice mode transcripts are saved in chat history like text conversations; you can switch between text and voice in one conversation. Source: [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)
- The iOS widget's microphone button opens the app directly in dictation mode. Source: [Use dictation on Claude Mobile](https://support.claude.com/en/articles/10065434-use-dictation-on-claude-mobile)
- Claude for iOS can be placed on the Lock Screen, Control Center and Action button. Source: [Access Claude for iOS on Lock Screen, Control Center, Action button](https://support.claude.com/en/articles/10302511-accessing-claude-app-on-ios-lock-screen-control-center-and-action-button)
- The "Ask Claude" App Intent (iOS 18+) works from Spotlight, Siri, the Share menu and Shortcuts, can be used without opening the app, uses the default model, and counts toward the usage limit. The article says Ask Claude actions can be chained with other apps and Claude's responses processed in various ways, but does not state whether a new chat is created per call or whether a Project can be chosen. Source: [Use Claude app intents, shortcuts, and widgets on iOS](https://support.claude.com/en/articles/10263469-use-claude-app-intents-shortcuts-and-widgets-on-ios)
- Claude on iOS can create items in system apps like Reminders and Calendar but does not read existing messages or emails. Source: [Use Claude with iOS apps](https://support.claude.com/en/articles/11869619-use-claude-with-ios-apps)
- Paid plans can search past chats on web, Desktop and mobile; memory is stored as topics, viewable and editable in Settings > Memory; memory is on by default for Free, Pro and Max. Source: [Use Claude's chat search and memory](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context)
- Each Project has its own memory; Claude uses that project memory plus account memory, but not memory from other projects. Source: [Use Claude's chat search and memory](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context); [What are projects?](https://support.claude.com/en/articles/9517075-what-are-projects)
- Conflict: the voice mode article says voice mode is not available in Cowork and Claude Code (dictation is), while a Claude Code power user tips page says voice mode is available there. Source: [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode); [Claude Code power user tips](https://support.claude.com/en/articles/14554000-claude-code-power-user-tips)
- Notion is available as a web connector in Claude's Connectors Directory. Source: [When to use desktop and web connectors](https://support.claude.com/en/articles/11725091-when-to-use-desktop-and-web-connectors)

### Inferences
- A Project named something like "Idea inbox" with instructions ("tag each idea, link to earlier ones, keep a running list") gives a zero setup inbox, and later chats in that Project can synthesize across it using chat search and project memory.
- Because voice mode can use connected tools, a voice conversation could in principle write directly to Notion through the connector. Not verified on mobile.
- Weakness: chat history is not an exportable, structured store other tools (Obsidian, scripts) can read without a manual export, so it locks synthesis to Claude chats.

### Gaps
- No official source on whether Ask Claude via Shortcuts can target a specific Project or returns plain text reliably to later Shortcut actions.
- No official Anthropic "notes" feature found; memory is topic-level preference memory, not a notes database.
- Could not confirm which connectors are usable from the mobile app versus web and Desktop.

## Apple Shortcuts + Action Button pipelines

### Takeaway
The proven pattern is: Action Button runs a Shortcut that records, transcribes (on-device or Whisper API), optionally sends text to an LLM, and saves a markdown file into the iCloud folder that holds an Obsidian vault. Published examples mostly use OpenAI for transcription; no tested published recipe calling the Claude API from Shortcuts was found, but the built-in Ask Claude action avoids needing an API key.

### Cited Findings
- Obsidian forum shortcut (July and August 2023): share an audio file, send to OpenAI Whisper, send transcript to ChatGPT to format and summarize, save to the iCloud vault folder; needs an OpenAI API key and a save folder setting. Later replies added an offline variant using the Aiko app for on-device Whisper (Feb 2024), a RoutineHub shortcut plus plugin using Aiko (Apr 2024), and a July 2026 suggestion of voicenotes.app. The author said automatic upload without manual sharing would be better. Source: [Obsidian forum: iPhone Voice Memo -> Obsidian](https://forum.obsidian.md/t/iphone-voice-memo-obsidian/63540)
- Shortcuts in iOS 26 has an Apple "Transcribe Audio" action described as on-device for supported languages. Source: [Spokenly blog (vendor)](https://spokenly.app/blog/voice-memo-to-text-iphone)
- An Apple Community thread (Oct 2025) reports that after iOS 26 shortcuts using the audio transcription action failed with "No common audio files among modules", not fixed by iOS 26.0.1. Current status unknown. Source: [Apple Community thread](https://discussions.apple.com/thread/256155805)
- Third-party Shortcuts actions exist, for example Shortcut Recorder's "Stop Recording and Transcribe" using on-device Apple speech recognition. Source: [Shortcut Recorder, App Store](https://apps.apple.com/app/id6760636603)
- A vendor page (MythOS) describes an Action Button shortcut that records, transcribes on-device and passes the transcript to Claude via the Ask Claude action. Unverified vendor content. Source: [mythos.one](https://mythos.one/me/mythos/cc9829)
- "Get Contents of URL" supports POST with custom headers and JSON bodies, which is how a Shortcut would call an API directly; a common failure is a malformed or empty header key. Source: [Automators forum](https://talk.automators.fm/t/send-post-request-with-get-contents-of-url/15943); [Apple Developer Forums](https://developer.apple.com/forums/thread/720728)
- A Mac pipeline watches the Voice Memos folder, transcribes new memos and runs a text processing shortcut into the vault; the author used a third-party helper because Shortcuts' native AI support was rudimentary. Source: [Obsidian Audio Inbox, Alexander Weichart](https://alexanderweichart.de/5_Archive/4_Projects/audio-inbox/Obsidian-Audio-Inbox); [Audio Inbox plugin](https://community.obsidian.md/plugins/audio-inbox)

### Inferences
- Lowest maintenance phone side: record, transcribe on-device, append to `Inbox/YYYY-MM-DD-HHmm.md` in the iCloud vault, stop. Do the AI cleanup on the Mac on a schedule. This keeps the phone shortcut free of API keys and model changes, and a failed AI step never loses the raw capture.
- Calling the Anthropic API directly from Shortcuts is feasible (JSON POST with x-api-key and anthropic-version headers) but requires a separate pay-as-you-go API key and storing it in the Shortcut; the Ask Claude action uses the subscription instead.
- Keep the audio file too (save m4a next to the note) so a bad transcription can be redone.

### Gaps
- No verified, current, published Shortcut template that calls the Claude API and writes to Obsidian.
- Whether the iOS 26 transcription bug is fixed in later 26.x releases was not confirmed.

## Obsidian vault + Claude Code / Claude Desktop with MCP as a second brain

### Takeaway
An Obsidian vault is a folder of markdown files, so Claude Code reads and writes it directly with no plugin; Claude Desktop can reach it via community Obsidian MCP servers built on the Local REST API plugin. The common pattern is an Inbox folder for raw captures that Claude processes later into tagged, linked notes.

### Cited Findings
- Guides note the vault is just a folder of markdown files, which lets Claude Code read it and write back; several use an Inbox folder as the landing zone and list voice transcripts among inbox inputs; layouts range from simple to PARA. Source: [MindStudio guide](https://www.mindstudio.ai/blog/build-ai-second-brain-claude-code-obsidian); [codemeetai Substack](https://codemeetai.substack.com/p/how-to-build-a-second-brain-with); [Productory non-tech guide](https://productory.substack.com/p/obsidian-claude-code-non-tech-guide); [HackerNoon](https://hackernoon.com/obsidian-holds-the-notes-claude-does-the-work-second-brain)
- One developer workflow: record a short evening memo, give the transcript to Claude, run a custom command that writes a structured daily note, used in a weekly review. Source: [codemeetai Substack](https://codemeetai.substack.com/p/how-to-build-a-second-brain-with)
- Open-source project obsidian-second-brain provides persistent memory for Claude Code and other CLI agents stored as markdown in the vault. Source: [gittrend listing](https://gittrend.io/repo/eugeniughelbur/obsidian-second-brain)
- Obsidian MCP servers for Claude Desktop (e.g. MarkusPfundstein's Python server, listed with about 2.5K stars per a directory site) use the Local REST API community plugin (default port 27123, API key) and need Obsidian running. Source: [Playbooks: markuspfundstein-obsidian](https://playbooks.com/mcp/markuspfundstein-obsidian); [Glama Obsidian MCP REST](https://glama.ai/mcp/servers/PublikPrinciple/obsidian-mcp-rest)
- Voice MD plugin: start recording from an iPhone Action Button shortcut; saves audio locally before transcribing so failed uploads can be retried; transcription uses OpenAI. Source: [Voice MD](https://community.obsidian.md/plugins/voice-md)
- Quick Voice Note plugin: an iOS Shortcut or NFC tag pointing at `obsidian://voice-note` starts recording; stopping saves audio to the vault and adds a transcribed entry to the daily note. Source: [Quick Voice Note](https://community.obsidian.md/plugins/quick-voice-note)
- Smart Connections: free open-source plugin that embeds the vault locally (no API key by default), shows related notes, supports Ollama, LM Studio and cloud models including Claude; open-core with Pro extensions. Source: [Smart Connections](https://community.obsidian.md/plugins/smart-connections); [Asian Efficiency setup guide](https://www.asianefficiency.com/technology/obsidian-ai-plugins-setup/)

### Inferences
- For a Claude Code user, the MCP server is optional: Claude Code or a Desktop scheduled task pointed at the vault folder can already read, tag, add `[[links]]` and write digests. MCP matters mainly for chatting with the vault from Claude Desktop chat or mobile.
- Obsidian MCP via Local REST API requires the Obsidian app to be open on the Mac, a fragility filesystem access avoids.
- Smart Connections complements Claude by surfacing related notes inside Obsidian without sending content to a cloud model.

### Gaps
- No source found for a maintained "Whisper for Obsidian" plugin in 2026; Voice MD and Quick Voice Note fill that role. Not verified whether the older Whisper plugin is still maintained.
- Community guide setup details (folder names, commands) are unverified.

## Notion + official Notion connector as the store

### Takeaway
Notion hosts an official remote MCP server that Claude.ai and Claude Desktop connect to as a web connector; it can search, read, create and update pages and databases. It is the best store if the processing must run in the cloud with the Mac off, but the phone to Notion capture step still needs a Shortcut, the Notion app, or a third-party service.

### Cited Findings
- Notion MCP is a Notion-hosted remote server that works with Claude Desktop and Claude.ai; tools cover searching, reading, creating and updating content, and creating pages and databases; it respects existing Notion permissions. Source: [Notion help: Notion MCP](https://www.notion.com/help/notion-mcp); [Notion Developers: Get started with MCP](https://developers.notion.com/guides/mcp/get-started-with-mcp)
- Notion is listed as a web connector in Claude's Connectors Directory. Source: [When to use desktop and web connectors](https://support.claude.com/en/articles/11725091-when-to-use-desktop-and-web-connectors)
- Separately, Notion offers Claude agents running inside Notion, in beta on Business and Enterprise plans. Source: [Use Claude agents in Notion](https://www.notion.com/help/use-claude-agents-in-notion)

### Inferences
- Pairing: Shortcut transcribes and creates a row in a Notion "Inbox" database (Notion's API or the Notion app's Shortcuts actions); a cloud routine with the Notion connector processes new rows daily.
- Notion locks notes in a proprietary store; Obsidian keeps plain files on disk.

### Gaps
- Did not verify Notion's own iOS Shortcuts actions or rate limits for the phone side.

## Automations and scheduled Claude processing (daily or weekly digests)

### Takeaway
Claude now has first-party scheduling, which removes most need for Zapier, Make or n8n: Claude Code Desktop local scheduled tasks (files on the Mac, Mac must be awake) and cloud routines (Mac off, schedule or HTTP API trigger, connectors, GitHub repos). Third-party chains work but add subscriptions, API keys and more failure points.

### Cited Findings
- Cloud routines: saved prompt plus repos plus connectors run on Anthropic infrastructure; triggers are schedule (hourly, daily, weekdays, weekly, custom cron via /schedule, minimum 1 hour), API (POST to a per-routine /fire endpoint with a bearer token, optional `text` payload) and GitHub events. Research preview. Pro, Max, Team, Enterprise. Runs draw down subscription usage; 100 scheduled runs per hour per account; 30 Run now or API fires per hour per routine. Source: [Routines docs](https://code.claude.com/docs/en/routines)
- Routines run autonomously with no permission prompts and can use every tool of included connectors, including writes. Fire `text` arrives wrapped as untrusted data, so the saved prompt must explicitly say to act on the payload. The /fire endpoint uses beta header `experimental-cc-routine-2026-04-01` and may change. Source: [Routines docs](https://code.claude.com/docs/en/routines)
- Routines clone GitHub repos each run and push to `claude/` prefixed branches; locally added MCP servers are not available, only claude.ai connectors or a committed `.mcp.json`. Source: [Routines docs](https://code.claude.com/docs/en/routines)
- Desktop local scheduled tasks: run on the Mac with direct file access, only while Claude Desktop is open and the Mac awake; presets Manual, Hourly, Daily, Weekdays, Weekly, custom intervals by asking; minimum interval 1 minute. Missed runs: one catch-up run on wake for the most recent miss within 7 days. Per-task permission mode; use Run now once and "always allow" to avoid stalls. Prompts stored at `~/.claude/scheduled-tasks/<name>/SKILL.md`. "Keep computer awake" setting exists; closing the lid still sleeps. Source: [Desktop scheduled tasks docs](https://code.claude.com/docs/en/desktop-scheduled-tasks)
- Zapier route: Zap watches a cloud folder for memos, Whisper transcribes, Claude processes, result lands in Notion; multi-step Zaps need a paid Zapier plan and API credit is separate. Source: [We Eat Robots Substack](https://weeatrobots.substack.com/p/voice-memo-ai-automation-productivity-workflow)
- n8n route: paid Gumroad templates use a Telegram bot as voice input, Whisper plus Claude, output to a Notion database. Prices seller-reported. Source: [n8n voice to Notion capture (Gumroad)](https://krisograbek.gumroad.com/l/n8n-ai-automation-voice-to-notion-capture)
- Zapier lists a Voicenotes integration pairable with Claude and Notion. Source: [Zapier Voicenotes integrations](https://editor.vercel.zapier.com/apps/voicenotes/integrations)

### Inferences
- Recommended digest setup for this user: a Desktop local scheduled task, daily around 7am, working folder = the Obsidian vault, prompt: process every file in `Inbox/`, clean transcript, add tags and frontmatter, link to related notes, move to `Ideas/`, append to `Digests/YYYY-WW.md`. Weekly task writes cross-idea connections.
- Because of the catch-up rule, a daily task on a laptop that slept all day still runs once on wake, so no captures are skipped, only delayed.
- The routine API trigger means an iPhone Shortcut could POST the transcript straight to a cloud routine ("Get Contents of URL" with bearer token) for near-instant processing with the Mac off. But routines write to a GitHub repo, not iCloud, so the vault would need to be a git repo synced to the Mac (Obsidian Git plugin), adding moving parts. Inference, not a documented recipe.

### Gaps
- No first-hand reports found of people using routines or Desktop scheduled tasks specifically for voice idea digests.

## Tradeoffs: cost, privacy, reliability, what breaks

### Takeaway
The cheapest, most private and most robust design keeps transcription on-device, storage as plain files in iCloud, and AI processing in Claude Desktop under the existing subscription. Each extra service (OpenAI key, Zapier, n8n, Notion API) adds a bill and a failure point.

### Cited Findings
- Ask Claude in Shortcuts and routines consume subscription usage rather than separate API billing. Source: [iOS intents article](https://support.claude.com/en/articles/10263469-use-claude-app-intents-shortcuts-and-widgets-on-ios); [Routines docs](https://code.claude.com/docs/en/routines)
- Privacy concern about sending material to AI services drove forum users to on-device Whisper (Aiko). Source: [Obsidian forum](https://forum.obsidian.md/t/iphone-voice-memo-obsidian/63540)
- Apple's Transcribe Audio is described as on-device; its iOS 26 bug shows OS updates can break shortcuts. Source: [Spokenly](https://spokenly.app/blog/voice-memo-to-text-iphone); [Apple Community](https://discussions.apple.com/thread/256155805)
- Desktop tasks skip if the Mac sleeps (catch-up once on wake); cloud routines stop after 72 hours of disconnected GitHub; a green routine status does not mean the task succeeded. Source: [Desktop scheduled tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks); [Routines docs](https://code.claude.com/docs/en/routines)
- Smart Connections embeds locally by default; hosted models receive queries if chosen. Source: [Asian Efficiency](https://www.asianefficiency.com/technology/obsidian-ai-plugins-setup/)
- Zapier multi-step needs a paid plan plus separate API credit. Source: [We Eat Robots](https://weeatrobots.substack.com/p/voice-memo-ai-automation-productivity-workflow)

### Inferences
- Likely breakpoints, most to least likely: iOS updates changing Shortcuts actions; iCloud sync lag (note captured on phone not yet on Mac when the task runs); Desktop task stalled on a permission prompt; research preview API changes for routines; community plugin abandonment.
- Mitigation: phone shortcut writes raw text plus audio and does nothing else; Mac task is idempotent (moves processed files out of Inbox) so a lagging sync is picked up next run.

### Gaps
- No reliable published monthly cost figures for any pipeline; a third-party guide's "$2 to 10 per month" for API use is an unverified estimate. Source: [Asian Efficiency](https://www.asianefficiency.com/technology/obsidian-ai-plugins-setup/)
