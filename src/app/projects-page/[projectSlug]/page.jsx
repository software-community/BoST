import { getAllProjects } from "@/app/actions/ProjectData";
import { notFound } from "next/navigation";
import Image from "next/image";

const statusMap = {
  completed: "Completed",
  in_progress: "In Progress",
  not_started: "Not Started",
};

const ProjectPage = async ({ searchParams }) => {
  const { id } = searchParams;

  if (!id) return notFound();

  const allProjects = await getAllProjects(process.env.SUPER_ADMIN);
  const project = allProjects.find((p) => p.id === id);

  if (!project) return notFound();

  return (
    <section className="w-full min-h-[90vh] flex flex-col lg:flex-row justify-center items-center px-6 py-6 gap-6">
      <div className="w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center items-start gap-5">
        <h1 className="w-full text-center font-bold text-5xl lg:text-7xl LandingHeroTitle text-black">
          {project.title}
        </h1>

        <p className="roboto-light text-xl lg:text-2xl LandingHeroSubtitle text-center w-full">
          {project.description}
        </p>

        <div className="w-full mt-4 flex flex-col items-center gap-3 LandingHeroSubtitle">
          <div className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-xl shadow-sm">
            Status: {statusMap[project.status] || "Unknown"}
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {project.members
              .split(",")
              .map((member) => (
                <span
                  key={member.trim()}
                  className="px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-xl shadow-sm"
                >
                  {member.trim()}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex justify-center LandingHeroImage items-center">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={400}
          className="object-cover aspect-square Globe rounded-full w-full max-w-[400px]"
        />
      </div>
    </section>
  );
};

export default ProjectPage;
