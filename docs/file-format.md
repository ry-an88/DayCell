# The Daycell file format

Version 1. A Daycell journal is **one UTF-8 Markdown file**. Anything that can edit text can read and write it,
and it's designed to be readable without Daycell. This page describes it so other tools can use it too.

## Layout

```markdown
# Morning Pages

## 2026-10-07 · 21:14 — Title of the entry
mood:: good
tags:: #work #ideas

Body in Markdown.

---

## 2026-10-08 · 07:02 — Untitled

Another entry.

---

# Trash

## 2026-10-01 · 08:30 — An old entry
deleted:: 2026-10-07 21:20

Text of the old entry.

---
```

1. **Preamble:** everything before the first entry, usually a `# Title` line. Kept as written.
2. **Entries:** each starts with a level-2 heading and runs until the next entry heading, the `# Trash` heading, or
   the end of the file.
3. **Trash:** an optional `# Trash` heading (any case). Entries under it are deleted but restorable.

## Entry heading

```
## YYYY-MM-DD · HH:MM — Title
```

- **Date** is required, in ISO format.
- **Time** is optional, 24-hour. Readers should also accept `|` in place of `·`.
- **Title** is optional. Readers should also accept `–` or `-` in place of `—`. A title of `Untitled` means no title.

Regular expression used by Daycell:

```
^##\s+(\d{4}-\d{2}-\d{2})(?:\s*[·|]\s*(\d{1,2}:\d{2}))?(?:\s*[—–-]\s*(.*?))?\s*$
```

Level-2 headings that don't start with a date are part of the entry body, not new entries.

## Fields

Optional `key:: value` lines directly under the heading (blank lines before them are allowed). This is the same
inline-field syntax as Obsidian's Dataview plugin.

| Key | Value |
|---|---|
| `mood` | one of `rough`, `meh`, `okay`, `good`, `great` |
| `tags` | space- or comma-separated, with or without `#` |
| `deleted` | `YYYY-MM-DD HH:MM`, only on entries under `# Trash` |

The first line that isn't a known field starts the body. Unknown `key:: value` lines are kept in the body untouched.

## Body

Plain Markdown. A trailing `---` line (or several) is the entry separator, not part of the body.

## Download stamp

Copies downloaded from the web version carry one HTML comment on the line after the preamble title:

```
<!-- daycell:saved 2026-10-07T20:15:00Z -->
```

It records when the copy was saved, so Daycell can warn when someone opens an older copy. Other tools can ignore it.

## Writing rules

- Entries are written oldest first, each followed by a blank line, `---` and a blank line.
- Line endings are `\n`. Readers should accept `\r\n`.
- Entries with neither a title nor a body are not written.

## Licence

This format description is public domain (CC0). Use it in anything.
