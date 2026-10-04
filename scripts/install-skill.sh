#!/bin/sh
set -eu

usage() {
  printf 'Usage: %s [both|claude|codex]\n' "$0"
  printf 'Link the UI Kit skill into your personal Claude Code and/or Codex skills directory.\n'
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
claude_skills_dir=${UI_KIT_CLAUDE_SKILLS_DIR:-${CLAUDE_CONFIG_DIR:-$HOME/.claude}/skills}
codex_skills_dir=${UI_KIT_CODEX_SKILLS_DIR:-$HOME/.agents/skills}
if [ -n "${CODEX_HOME:-}" ] && [ -z "${UI_KIT_CODEX_SKILLS_DIR:-}" ]; then
  codex_skills_dir=$CODEX_HOME/skills
fi

# Check every selected destination before creating links. Never replace an existing skill.
check_destination() {
  destination=$1/ui-kit
  if [ -L "$destination" ] && [ "$(readlink "$destination")" = "$skill_root" ]; then
    return
  fi
  if [ -e "$destination" ] || [ -L "$destination" ]; then
    printf 'An existing skill occupies %s; nothing was replaced.\n' "$destination" >&2
    exit 1
  fi
}

link_skill() {
  destination=$1/ui-kit
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

printf '\nUse /ui-kit in Claude Code or $ui-kit in Codex.\n'
printf 'If the skill is missing from an open session, restart that session.\n'
printf 'Keep this checkout in place; git pull updates the linked skill and source together.\n'
