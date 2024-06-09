export default function TeamMember({ name, role, image }) {
    return (
        <div className="transform transition duration-300 hover:scale-110 rounded-lg shadow-lg lg:h-42 lg:w-70 gap-2 justify-around hover:shadow-xl bg-white p-2 ">
        <img
            className="w-24 h-24 rounded-full mb-4 justfiy-center mx-auto items-center"
            src="/Home/person.jpeg"
            alt={name}
        />
        <h3 className="text-lg font-semibold text-center">{name}</h3>
        <p className="text-sm text-gray-500 text-center">{role}</p>
        </div>
    );
    }