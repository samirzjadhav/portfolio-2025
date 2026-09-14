import { useContext } from "react";
import ProjectCardMotionContext from "../components/ProjectCardMotionContext";

export function useProjectCardMotion() {
  return useContext(ProjectCardMotionContext);
}
