import { getAllProjects } from "@/app/actions/ProjectData";
import { notFound } from "next/navigation";
import Image from "next/image";
import TeamMember from "@/components/ui/TeamMember"; // adjust path as needed
import { IconBrandGithub, IconWorld } from "@tabler/icons-react";

const statusMap = {
  completed: "Completed",
  in_progress: "In Progress",
  not_started: "Not Started",
};

const ProjectPage = async ({ params, searchParams }) => {
  const { id } = searchParams;
  const { clubname, projectSlug } = params;

  if (!id) return notFound();

  const allProjects = await getAllProjects(clubname);
  const project = allProjects.find((p) => p.id === id);

  if (!project) return notFound();

  return (
    <div>
      <section className="w-full min-h-[75vh] flex flex-col lg:flex-row justify-center items-center px-6 py-6 gap-6">
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
            <div className="flex flex-wrap gap-4 mt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-700 transition"
                >
                  <IconBrandGithub size={20} />
                  GitHub
                </a>
              )}
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
                >
                  <IconWorld size={20} />
                  Website
                </a>
              )}
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
      
      <section className="mb-6">
        <div className="w-full flex flex-col items-center gap-6">
          <h2 className="text-3xl font-semibold text-center text-black">
            Contributors
          </h2>

          {typeof project.members === "string" ? (
            <div className="flex flex-col items-center gap-2">
              {project.members.split(",").map((name, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-xl shadow-sm"
                >
                  {name.trim()}
                </div>
              ))}
            </div>

          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {project.members?.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  role={"Team Member"}
                  image={member.image}
                  email={member.email}
                  github={member.github}
                  linkedin={member.linkedin}
                />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default ProjectPage;

