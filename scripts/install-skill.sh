#!/bin/sh
set -eu

usage() {
  printf 'Usage: %s [both|claude|codex]\n' "$0"
  printf 'Link the skill into Claude Code and/or Codex using the name in skill/SKILL.md.\n'
}

agent=${1:-both}
if [ "$#" -gt 1 ]; then
  usage >&2
  exit 1
fi
case "$agent" in
  both|claude|codex) ;;
  -h|--help) usage; exit 0 ;;
  *) usage >&2; exit 1 ;;
esac

skill_root=$(CDPATH= cd -- "$(dirname -- "$0")/../skill" && pwd -P)
skill_name=$(awk '
  /^---$/ { section++; next }
  section == 1 && /^name:[[:space:]]*/ { sub(/^name:[[:space:]]*/, ""); print; exit }
' "$skill_root/SKILL.md")
case "$skill_name" in
  ''|*[!a-z0-9-]*|-*|*-|*--*)
    printf 'Use lowercase letters, digits, and single hyphens for name in skill/SKILL.md.\n' >&2
    exit 1
    ;;
esac
if [ "${#skill_name}" -gt 64 ]; then
  printf 'The skill name in skill/SKILL.md must be 64 characters or fewer.\n' >&2
  exit 1
fi

claude_skills_dir=${UI_KIT_CLAUDE_SKILLS_DIR:-${CLAUDE_CONFIG_DIR:-$HOME/.claude}/skills}
codex_skills_dir=${UI_KIT_CODEX_SKILLS_DIR:-$HOME/.agents/skills}
if [ -n "${CODEX_HOME:-}" ] && [ -z "${UI_KIT_CODEX_SKILLS_DIR:-}" ]; then
  codex_skills_dir=$CODEX_HOME/skills
fi

# Check every selected destination before creating links. Never replace an existing skill.
check_destination() {
  destination=$1/$skill_name
  if [ -L "$destination" ] && [ "$(readlink "$destination")" = "$skill_root" ]; then
    return
  fi
  if [ -e "$destination" ] || [ -L "$destination" ]; then
    printf 'An existing skill occupies %s; nothing was replaced.\n' "$destination" >&2
    exit 1
  fi
}

link_skill() {
  destination=$1/$skill_name
  if [ -L "$destination" ]; then
    printf 'Already linked: %s\n' "$destination"
    return
  fi
  mkdir -p "$1"
  ln -s "$skill_root" "$destination"
  printf 'Installed: %s -> %s\n' "$destination" "$skill_root"
}

if [ "$agent" != codex ]; then check_destination "$claude_skills_dir"; fi
if [ "$agent" != claude ]; then check_destination "$codex_skills_dir"; fi
if [ "$agent" != codex ]; then link_skill "$claude_skills_dir"; fi
if [ "$agent" != claude ]; then link_skill "$codex_skills_dir"; fi

printf '\nUse /%s in Claude Code or $%s in Codex.\n' "$skill_name" "$skill_name"
printf 'If the skill is missing from an open session, restart that session.\n'
printf 'Keep this checkout in place; git pull updates the linked skill and source together.\n'
