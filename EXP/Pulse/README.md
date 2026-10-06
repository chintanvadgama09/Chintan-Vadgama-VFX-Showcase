# Pulse — Gamified Fitness Habit App

A clean, offline-first, modular fitness/habit web app inspired by behavioral gamification principles.

## Run
Open `index.html` in a modern browser.

No build step and no external libraries are required.

## Modules
- `index.html` — Dashboard / daily home
- `nutrition.html` — calorie target, macro snapshot, daily weight log
- `food-log.html` — calorie counter and saved foods
- `activities.html` — activity library, custom activities, daily planning/logging
- `progress.html` — trends, streaks, XP, levels, achievements, consistency
- `settings.html` — data import/export, reset, theme, profile

## Storage
All user data is held inside one versioned JSON document and stored under a single localStorage key:
`pulseFitnessData`

The app:
- validates imported JSON
- adds missing defaults safely
- saves after mutations
- records `updatedAt`
- supports JSON export/import
- stores saved foods, logs, activities, gamification state and settings in the same document

The JSON is intentionally human-readable on export.

## Gamification model
The app uses a lightweight, behavior-focused loop:
- XP + levels for meaningful completions
- Daily streak with a limited recovery token
- Weekly commitment / "Momentum" target
- Daily quests generated from planned actions
- Achievement milestones
- consistency score based on completed planned habits
- social-style "accountability" language and shareable progress without inventing a backend/social network

Health behavior remains user-controlled: missed days do not erase logs. A finite streak shield can preserve a streak across one missed day, and that shield is consumed when used.
