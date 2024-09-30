import Button from "./Button.jsx";

export default function ProjectSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <aside className=" w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-60 rounded-r-xl ">
      <h2 className="mb-8 font-bold uppercase md:text-xl  text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <div className="mt-2">
        <ul>
          {projects.map((project) => {
            let classes =
              "py-2 px-1  rounded text-left w-full rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

            if (project.id === selectedProjectId) {
              classes += " bg-stone-800 text-stone-200";
            } else {
              classes += " text-stone-400";
            }

            return (
              <li key={project.id}>
                <button
                  className={classes}
                  onClick={() => onSelectProject(project.id)}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <ul></ul>
    </aside>
  );
}
