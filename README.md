# ⏱️ IF Tracker

🌐 **English** | [ภาษาไทย](README.th.md)

A web app for tracking **Intermittent Fasting (IF)**, weight, workouts, and water intake in one place.
Orange-themed design, responsive for mobile and desktop, with light/dark mode.

All data is stored in **your browser (localStorage)** — no sign-up and nothing is sent to a server.

> Note: the interface is in Thai.

## ✨ Features

| Page | Details |
|------|---------|
| 🏠 **Dashboard** | Today's overview: IF status (fasting / eating window), latest weight, recent workouts, and a daily water-glass counter |
| ⏲️ **IF Timer** | Circular fasting timer with selectable protocols: 16:8, 18:6, 20:4, OMAD (23:1); notifies you when the goal is reached |
| ⚖️ **Weight** | Log daily weight, set a target weight, and view history |
| 🏋️ **Exercise** | Log exercises with sets, reps, and weight used |
| 📈 **Progress** | Progress charts, completed-fast stats, active days in the last 7 days, and fasting history |
| 💾 **Backup** | Export/import your data as a JSON file to move devices or avoid data loss |
| 🌗 **Theme** | Toggle between dark and light mode |

## 🛠️ Tech Stack

- [React 18](https://react.dev/) + TypeScript
- [Vite](https://vite.dev/) (build tool)
- [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- [React Router 7](https://reactrouter.com/)
- [Recharts](https://recharts.org/) (charts), [date-fns](https://date-fns.org/) (Thai-locale dates), [Lucide](https://lucide.dev/) (icons), Motion (animation), canvas-confetti

## 🚀 Getting Started

Requires [Node.js](https://nodejs.org/).

```bash
# 1. Clone the repository
git clone https://github.com/jetniphat1234za-coder/IF-TRACKER.git
cd IF-TRACKER

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open the URL Vite prints (usually <http://localhost:5173>).

Build for production:

```bash
npm run build
```

## 📁 Project Structure

```
IF-TRACKER/
├── index.html
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.tsx            # Page routes
│   │   ├── components/           # Layout, FloatingIcons, ui/ (shadcn)
│   │   ├── context/              # TrackerContext (main state), ThemeContext
│   │   ├── hooks/useLocalStorage.ts
│   │   └── pages/                # Dashboard, IFTimer, WeightLog, ExerciseLog, Progress
│   └── styles/
└── package.json
```

## 🔒 Privacy

All data lives in the localStorage of the browser you use. Clearing browser data will erase it,
so use **Export data** on the Progress page regularly to keep a backup.

## 🙏 Credits

- Prototype designed with [Figma Make](https://www.figma.com/design/ROMA49arT5dwa8ivECGAgo/Webpage-Summary-for-IF-Tracker)
- Components from [shadcn/ui](https://ui.shadcn.com/) (MIT License) and photos from [Unsplash](https://unsplash.com) — see [ATTRIBUTIONS.md](ATTRIBUTIONS.md)
