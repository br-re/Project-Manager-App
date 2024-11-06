import { useState } from "react";
import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectState((prevProjectState) => {
      let newTask = {
        text: text,
        projectId: prevProjectState.selectedProjectId,
        id: Math.random(),
      };
      return {
        ...prevProjectState,
        tasks: [newTask, ...prevProjectState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        tasks: prevProjectState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prevProjectState) => {
      let newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: [...prevProjectState.projects, newProject],
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: prevProjectState.projects.filter(
          (project) => project.id !== prevProjectState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );
  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject setProjectState={setProjectState} onAdd={handleAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onChange={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <Sidebar
        onChange={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
