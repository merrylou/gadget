# PROJECT_RULES (Non-Negotiable)

This repo is maintained with PR-first workflow.
Breaking any rule below = PR rejected without review.

---

## 1) Single Source of Truth
- You MUST edit ONLY:
  - pomodoro/archive-pomodoro_work.html
- Any other file change is forbidden unless explicitly requested.

---

## 2) No Monkey Patch / No Post-hoc Injection
Forbidden patterns:
- `window.app.* = ...` (monkey patch)
- Adding extra `<script>` blocks
- Post-hoc DOM injection (creating DOM in unrelated places to patch behavior)

All behavior must live inside the existing `App` class methods.

---

## 3) renderTasks Contract (Structure)
In `renderTasks()` you MUST:
- Use exactly ONE list variable for active tasks
- Apply filters sequentially:
  1) category filter
  2) priority filter
- Call `sort()` exactly ONCE, before rendering
- Assign `innerHTML` exactly ONCE, after `map().join('')`

Strictly forbidden:
- `sort()` inside `map()`
- `innerHTML = ...` inside `map()`
- Multiple parallel arrays (`tasks / filtered / sorted` etc.)

---

## 4) Priority Rules
- `
