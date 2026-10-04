# Jimmy Wu's UI Kit

A dark UI kit with React components, CSS, and a design skill for Claude Code and Codex.

## Install the skill

On macOS or Linux, clone the repository and run the installer:

```sh
git clone https://github.com/JimmyWuReal/ui-kit.git
sh ui-kit/scripts/install-skill.sh
```

If you already have a checkout, run `sh scripts/install-skill.sh` from its root.
Install for just one app with `sh scripts/install-skill.sh claude` or
`sh scripts/install-skill.sh codex`.

The installer creates personal skill symlinks available across your projects:

| App | Default location | Invoke |
| --- | --- | --- |
| Claude Code, including local Code sessions in the desktop app | `~/.claude/skills/ui-kit` | `/ui-kit Build a settings page` |
| Codex | `~/.agents/skills/ui-kit` | `$ui-kit Build a settings page` |

Both links point to this checkout's `skill/` directory. Keep the **whole checkout**
in place: the skill's component references also use `src/`. No npm dependencies
are needed to install or read the skill. If you move the checkout, remove its old
symlinks and run the installer again. It refuses to overwrite any existing skill
and is safe to rerun for the same checkout.

The installer respects `CLAUDE_CONFIG_DIR` and `CODEX_HOME` when set. For a custom
skills location, set `UI_KIT_CLAUDE_SKILLS_DIR` or `UI_KIT_CODEX_SKILLS_DIR`.

If it does not appear in an open session, restart that session. The skill can
also activate automatically when you ask to use Jimmy Wu's UI kit. This local
installation is for Claude **Code**; Claude Cowork and cloud sessions use separate
skill installation mechanisms.

## Share and update

Send others the repository link and the two installation commands above.
**This repository is currently private**, so they need GitHub access and Git
authentication before cloning it. Invite them as collaborators, or make the
repository public if you want anyone to install it.

To update an installed skill, pull the latest changes in the checkout:

```sh
git -C ui-kit pull --ff-only
```

Use your checkout's actual path if it differs. Both apps use the updated files
through their existing links.

Installation paths and invocation syntax follow the official
[Claude Code skills documentation](https://code.claude.com/docs/en/skills) and
[Codex skills documentation](https://learn.chatgpt.com/docs/build-skills).

## Run the showcase

```sh
npm install
npm run dev
```

Run `npm run build` to produce the static showcase in `dist/`.
