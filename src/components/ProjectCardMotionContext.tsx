import { createContext } from "react";

interface ProjectCardMotionState {
  isHovered: boolean;
  isActive: boolean;
}

const ProjectCardMotionContext = createContext<ProjectCardMotionState>({
  isHovered: false,
  isActive: false,
});

export default ProjectCardMotionContext;
