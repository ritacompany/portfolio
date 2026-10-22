# Dossier reader prompt (used for every flow dossier)

A dossier reader is a sub-agent that builds one flow's dossier from the record. Paste this file into its prompt, with the flow steps, the topic and the extract path filled in. It exists because readers wrote "Not in the record: ask him" for product behaviour that the live screens or a later chat answered, and the question then went to him.

## Before any "ask him"

For each thing you would mark "Not in the record: ask him", sort it first:

1. Product behaviour (what a screen does, what triggers it, what it says, what happens in a case). Do not ask him. Open the live frame in the MVP Figma file (figma-mondai, file key 5RO0m4bYYrTvbiaOgaU3tI, create_session first, then get_design_context on the frame id from product-flows.md) and read what the screen shows. Then search the later chats for the same thing and prefer the latest of his turns. Write what you found with its frame id or cite. Only if neither shows it, write it as "Not shown on screen or in the record" with what you opened.
2. History only he holds (who did what, when, why a choice was made and no turn says so), taste, risk or a choice between options. These may be marked "Not in the record: ask him".

Never put a product behaviour question in Q7 as "ask him" without the line "Frame opened: <id>, shows: <what it shows>".

## Everything else

Format and cites follow the header comment of reference/check-dossier.mjs. His turns only for decisions. No summaries cited. Quotes copied exactly.
