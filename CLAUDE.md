# Project instructions

Keep the local UI kit skill up to date with project changes. When changing kit
components, styles, behavior, or design rules, update `skill/SKILL.md` and the
relevant reference files in `skill/` in the same task so the skill matches the
implementation.

## Sync the installed skill

Claude Code and Codex do not load the skill from this repository. They load a
copy: `~/.claude/skills/ui-kit` and `~/.agents/skills/ui-kit` link to
`~/projects/agent-config/skills/ui-kit`, in the separate `agent-config` repo. A
change in `skill/` reaches agents only after it is copied there, so make skill
changes here, never in the copy.

Whenever a task changes anything in `skill/`, finish it with these steps, after
committing here:

1. Run `git -C ~/projects/agent-config status --short skills/ui-kit`. If it lists
   anything, stop and ask, because step 2 would overwrite those edits.
2. From the root of this checkout, run
   `rsync -a --delete skill/ ~/projects/agent-config/skills/ui-kit/`.
3. Commit only `skills/ui-kit` in `agent-config`, describing the change. Push it
   only when asked.

Report the `agent-config` commit with your result. If `~/projects/agent-config`
does not exist on this device, say so rather than skipping it silently.
