# Claude free offering and usage cost of idea capture setups (as of 15 Oct 2026)

Note on currency: all Anthropic pages below were fetched on 15 Oct 2026. Third party pages (blogs, Reddit) are dated where known. Anthropic says limits are dynamic and publishes no fixed message counts, so every number about "how many messages" is an ESTIMATE from third parties, never official.

## 1. What the Claude Free plan includes

### Takeaway
Free (US, $0) includes chat on web, desktop and mobile, voice mode, dictation, memory, up to 5 Projects, file uploads, web search, Artifacts and connectors (limited to one custom connector). It excludes Claude Code, Research, Opus, scheduled tasks, Cowork, plugins and past chat search.

### Cited Findings
- Free plan feature list on the pricing page: "Chat on web, desktop, and mobile", "Search the web, create files, and run code", "Memory across conversations", "Connect your apps and tools", "Create Artifacts", "Claude Design, Slides, Docs". ([Claude pricing](https://claude.com/pricing))
- Pricing comparison table: Free gets voice mode, Projects "Up to 5", Sonnet and Haiku; Free does not get Opus, Research, Claude Code or usage credits. ([Claude pricing](https://claude.com/pricing))
- "Projects are available to all users, including those with free Claude accounts." "Free users can create a maximum of five projects." No free file count limit is stated. ([Help: create and manage projects](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects))
- Dictation (speech to text, Claude replies in text) is available to all plans including Free, via the microphone icon beside the chat input on iOS and Android; non English is in beta. ([Help: dictation on Claude Mobile](https://support.claude.com/en/articles/10065434-use-dictation-on-claude-mobile))
- Voice mode is a beta feature "available to all plans (Free, Pro, Max, Team, and Enterprise)" on mobile, desktop and web. "On the Free plan you can connect one tool." Text transcripts of voice conversations are saved in chat history. Voice conversations count toward regular usage limits. The article does not mention Projects or a length cap. ([Help: use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode))
- One search summary claimed Free voice mode uses Claude Haiku; the voice mode article itself only says models follow your plan and voice starts with the model last used in text chat. Treat "Haiku only" as unconfirmed. ([Help: use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode))
- Memory: memory from chat history was extended to all users, including Free, in March 2026, and is on by default on Free, Pro and Max. ([Help: chat search and memory](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context); [Claude blog: memory works everywhere](https://claude.com/blog/claudes-memory-works-everywhere-and-you-decide-whats-in-it))
- Past chat search is paid only: available "to users on paid plans (Pro, Max, Team, and Enterprise plans)". ([Help: chat search and memory](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context))
- Connectors: web connectors are "available for all users" on Claude, Desktop and Mobile; custom remote MCP connectors are on all plans but "Free users are limited to one custom connector"; installing connectors on mobile is in beta, and connectors set up on web or desktop become usable on mobile at next login. ([Help: use connectors](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities))
- The connectors help article does not list which directory connectors (Notion, Google Drive, Gmail) Free can use. The Microsoft 365 connector is stated as available on all plans including Free. ([Help: Microsoft 365 connector](https://support.claude.com/en/articles/12542951-set-up-the-microsoft-365-connector))
- Plugins (connectors bundled with skills) are paid plans only. ([Help: use plugins](https://support.claude.com/en/articles/13837440-use-plugins-in-claude))
- File uploads in chat: up to 20 files per chat, 500MB per file, PDFs up to 1000 pages. Project files: 30MB per file, unlimited count as long as content fits the context window. Not stated as plan specific. ([Help: upload files](https://support.claude.com/en/articles/8241126-upload-files-to-claude); [Help: projects](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects))
- Incognito chats are on all plans. ([Help: incognito chats](https://support.claude.com/en/articles/12260368-use-incognito-chats))

### Free vs Pro table (from Anthropic pages above)

| Feature | Free | Pro ($20/mo, or $200/yr) |
| :- | :- | :- |
| Mobile dictation | Yes | Yes |
| Voice mode (beta) | Yes, one connected tool | Yes, more tools |
| Projects | Up to 5 | Unlimited |
| Memory | Yes (since Mar 2026) | Yes |
| Past chat search | No | Yes |
| Connectors | Yes; one custom MCP connector | Yes |
| Plugins | No | Yes |
| File uploads | Yes | Yes |
| Web search | Yes | Yes |
| Research | No | Yes |
| Claude Code | No | Yes |
| Scheduled tasks / Cowork | No | Yes |
| Claude Code routines | No | Yes, 5 runs/day |
| Weekly limit | Not stated | Yes |

### Inferences
- A pure capture inbox (dictate into one Project chat) needs nothing Free lacks. What Free lacks is anything that runs unattended (scheduling, routines, Claude Code) and searching old chats.
- Because Free has no past chat search, retrieval of old ideas depends on memory, Project organization, or exporting text elsewhere.

### Gaps
- No Anthropic page found listing exactly which directory connectors (Notion, Google Drive) work on Free. The pricing page says Free can "Connect your apps and tools", and the comparison table marks Connectors under Pro; this is ambiguous.
- Whether Free voice mode is restricted to Haiku is unconfirmed.
- Whether voice mode can be started inside a Project chat on mobile is not documented in the articles fetched.

## 2. Pro and how usage limits work

### Takeaway
Every plan has a rolling five hour session limit; paid plans add a weekly limit. Pro gives "at least 5x" Free usage per session. claude.ai, Claude Desktop, Claude Code and routines all draw from one shared pool. Anthropic publishes no fixed message or token numbers.

### Cited Findings
- "Every plan has usage limits that reset on a rolling five-hour session window, and paid plans add weekly limits on top." "Free covers everyday questions." "Pro gives you at least 5x more usage per 5-hour session than Free." Pro: $20 billed monthly, $200 billed annually. ([Claude pricing](https://claude.com/pricing))
- Free: "a session-based usage limit that will reset every five hours"; the number of messages "will vary based on demand". ([Help: get started](https://support.claude.com/en/articles/8114491-get-started-with-claude))
- Session limit resets every five hours; weekly limits reset once a week; usage across claude.ai, Claude Code and Claude Desktop "counts toward the same limit". No numbers given. ([Help: how usage and length limits work](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work))
- Factors that drain usage: message length, attachment size, conversation length, tool use (web search, research), model choice, effort level, artifact creation, multi step tasks like running code or browsing. "Content in projects is cached and counts less against your limits when reused"; caches expire after inactivity. ([Help: usage limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices))
- Usage can be checked at Settings > Usage, showing the session and weekly limits and reset times. ([Help: usage limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices))
- Claude Code in terminal and IDE counts toward the same limits as web and desktop. ([Help: use Claude Code with Pro or Max](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan))
- Usage credits (pay as you go past limits) are only on paid plans; Free cannot buy them per the pricing table. ([Claude pricing](https://claude.com/pricing); [Help: usage credits](https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans))
- The older Pro usage article (8324991) now returns 404; its content was apparently folded into the articles above. ([Help: 8324991, 404 on 15 Oct 2026](https://support.claude.com/en/articles/8324991-about-claude-s-pro-plan-usage))

### Inferences
- Because Free has no stated weekly cap, a Free user who hits the session limit simply waits up to five hours. A Pro user can also be stopped for days by the weekly cap.

### Gaps
- No official message or token count for Free or Pro sessions or weeks exists in any Anthropic page found.

## 3. How much usage note tagging and digests would consume

### Takeaway
ESTIMATE: tagging 20 short notes or digesting 100 short notes in plain chat is one or a few messages and a small share of even a Free session. Doing the same through Claude Code or a routine costs several times more because agent sessions carry large context and many tool calls, and those tools are paid only anyway.

### Cited Findings
- Third party consensus (not official): Free allows roughly 15 to 40 messages per 5 hour window, varying with message length and demand; outliers range from 2 to 5 up to 45 to 100. One guide says a 40 page PDF with a detailed summary request can drain a Free window in 5 to 8 turns. ([Zenken: Claude usage limits 2026](https://ai.zenken.co.jp/en/post/claude-usage/); [heyuan110: free tier limits, Jul 2026](https://www.heyuan110.com/posts/ai/2026-07-08-claude-free-tier-limits/); [usecarly: usage limit](https://www.usecarly.com/blog/claude-usage-limit/))
- Limits are driven by length of messages, attachments and conversation, and by tool use and multi step tasks. ([Help: usage limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices))
- Reddit (Mar 2026, anecdotal): one maxed Sonnet session used about 8% of a Pro weekly allowance; Opus can use a large share from one complex prompt. ([r/ClaudeAI thread, Mar 2026, via search snippet](https://redlib.groet-infra.nl/r/ClaudeAI/comments/1rplxbv/claude_pro_weekly_limits_pro_plan_is_objectively/))

### Inferences (all ESTIMATES, not measured)
- 20 short notes at about 50 to 150 words each is roughly 1,500 to 4,000 tokens of input plus a few hundred to 2,000 tokens of output. Pasted into one message, that behaves like one ordinary longish message: likely one of the roughly 15 to 40 Free messages in a window.
- A weekly digest of 100 short notes is roughly 8,000 to 20,000 tokens of input. Comparable to pasting a short document; likely a handful of "message equivalents", still well inside one Free session if done once a week in a fresh chat.
- The bigger cost driver is conversation length: if notes accumulate in one long running chat, every new message re reads the whole thread, so a single inbox chat grows more expensive per message over weeks. Projects cache their files, which helps when the same material is reused. (Grounded in [Help: usage limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices))
- Agentic runs (Claude Code, routines) add system prompts, tool definitions and file reads on every step; the same digest done by an agent likely costs several times the chat version. This is an estimate; no Anthropic figure was found.
- On Pro, if one maxed session is about 8% of a week (anecdote above), a once weekly digest is a small single digit percentage of the weekly cap. ESTIMATE.

### Gaps
- No published token per session or token per week figures from Anthropic, so the ratios above cannot be made precise.
- No measured data found for Claude Code system prompt overhead per run.

## 4. Claude Code scheduled tasks and routines on Free

### Takeaway
Not available on Free. Routines, Claude Code, Cowork and scheduled tasks are Pro and above only.

### Cited Findings
- "Routines are available on Pro, Max, Team, and Enterprise plans." Routines are in research preview; behavior and limits may change. Runs "draw down subscription usage the same way interactive sessions do"; without usage credits, runs past the limit are rejected until the window resets. Minimum schedule interval is one hour. ([Claude Code docs: routines](https://code.claude.com/docs/en/routines))
- Routines need a claude.ai subscription login and run with GitHub repositories cloned each run. ([Claude Code docs: routines](https://code.claude.com/docs/en/routines))
- Daily caps at launch (Apr 2026): Pro 5 routine runs per day, Max 15, Team and Enterprise 25, extra runs possible with extra usage. ([Anthropic blog: introducing routines](https://claude.com/blog/introducing-routines-in-claude-code); [The Register, 14 Apr 2026](https://www.theregister.com/2026/04/14/claude_code_routines/)). The current docs page lists hourly limits (100 scheduled runs per hour per account) but no daily cap, so the 5 per day figure may be outdated. ([Claude Code docs: routines](https://code.claude.com/docs/en/routines))
- Scheduled tasks in Claude (Cowork, now being renamed simply "Claude") "are available on all paid plans (Pro, Max, Team, Enterprise)"; Cowork itself is paid only. ([Help: schedule recurring tasks in Cowork](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork); [Help: get started with Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork))
- Claude Code is not included in Free. ([Claude pricing](https://claude.com/pricing))

### Inferences
- A Free user cannot have Claude do anything on a schedule. Any automated tagging or digest on Free would have to be triggered by the user opening a chat.

### Gaps
- Conflict: blog says 5 routine runs per day on Pro; current docs show only hourly limits. Could not confirm which is current.

## 5. Mobile app as the idea inbox on Free

### Takeaway
Viable for capture: dictation and voice mode are free on mobile, transcripts save to chat history, and a Project can hold the inbox. Drawbacks are no past chat search, a session cap that varies with demand, growing cost of one long chat, five Project limit, and no automated processing.

### Cited Findings
- Dictation is free on iOS and Android; voice mode is free (beta) and saves text transcripts to chat history; both count toward usage. ([Help: dictation](https://support.claude.com/en/articles/10065434-use-dictation-on-claude-mobile); [Help: voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode))
- iOS has app intents, shortcuts and widgets; Android has a home screen widget, giving faster entry points. ([Help: iOS intents and widgets](https://support.claude.com/en/articles/10263469-use-claude-app-intents-shortcuts-and-widgets-on-ios); [Help: Android widget](https://support.claude.com/en/articles/10534883-use-the-claude-widget-on-android))
- Free past chat search is unavailable. ([Help: chat search and memory](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context))
- Free messages vary with demand; Free users are reported to be deprioritized at peak hours. ([Help: get started](https://support.claude.com/en/articles/8114491-get-started-with-claude); [Zenken: message limits by plan](https://ai.zenken.co.jp/en/post/claude-message-limits-by-plan/))
- Long conversations drain usage faster. ([Help: usage limit best practices](https://support.claude.com/en/articles/9797557-usage-limit-best-practices))
- Free is limited to 5 Projects. ([Help: projects](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects))

### Inferences
- Drawbacks in order of impact: (a) every capture is a message that triggers a Claude reply and consumes usage, unlike a notes app; (b) one ever growing inbox chat gets slower and costlier per message, so a new chat per week inside one Project is the cheaper pattern; (c) without chat search, ideas are hard to find later unless Claude produces a periodic summary that is copied out; (d) hitting the cap mid thought blocks capture until reset; (e) ideas live inside Claude, with export only through account data export or copy and paste.
- Dictation is cheaper than voice mode for capture because it is one message per idea, while voice mode is a spoken back and forth that generates more turns. ESTIMATE based on how each works.

### Gaps
- Could not confirm whether voice mode sessions can be started inside a Project on mobile.
- Real user reports specific to Free tier inbox use or light personal automation were not found; available Reddit reports (Feb to Apr 2026) concern Pro weekly caps, including one user doing "just daily news updates" who reported burning through weekly usage. ([r/ClaudeAI megathread, Mar 2026](https://redlib.groet-infra.nl/r/ClaudeAI/comments/1s7fcjf/claude_usage_limits_discussion_megathread_ongoing/ohe6ti1/?context=3); [Reddit snapshot, Apr 2026](https://reddit.sentinel-team.org/posts/1s6vywz/snapshots/2026-04-03T15%3A43%3A58.29457Z)). These were seen only as search snippets; the full thread fetch failed, so treat as unverified.
