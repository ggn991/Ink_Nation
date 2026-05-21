<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:agent-behavior-rules -->
# Agent Behavior Rules — Read Before Every Task

## ❌ NEVER run these automatically
- `npm run build`
- `npm run lint`
- `npm run type-check`
- `npm test`
- `npm install` (only if a new package is genuinely required)

## ✅ For every change request
1. Read ONLY the specific file that needs changing
2. Make the edit
3. Report: "Done — changed [what] in [file]"
4. Stop. Wait for next instruction.

## 🔨 Only run build/lint/checks when I explicitly say
- "run build"
- "check for errors"
- "verify"
- "lint this"

## 📁 File reading
- Do NOT scan the entire codebase for small changes
- Do NOT re-read files you already read this session
- Ask me if you need context — don't explore on your own
<!-- END:agent-behavior-rules -->