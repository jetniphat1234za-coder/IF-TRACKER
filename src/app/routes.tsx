import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { IFTimer } from "./pages/IFTimer";
import { WeightLog } from "./pages/WeightLog";
import { ExerciseLog } from "./pages/ExerciseLog";
import { Progress } from "./pages/Progress";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "timer", Component: IFTimer },
      { path: "weight", Component: WeightLog },
      { path: "exercise", Component: ExerciseLog },
      { path: "progress", Component: Progress },
    ],
  },
]);
