export default function TeamMember({ name, role, image }) {
    return (
        <div className="text-black bg-slate-100 w-72 h-48 rounded-lg flex flex-col flex-none justify-center items-center transform transition duration-300 hover:scale-110">
            <img
            className="w-28 h-26 mb-4 rounded-lg justfiy-center mx-auto items-center"
            src="/Home/person.jpeg"
            alt={name}
        />
        <h3 className="text-lg font-semibold text-center">{name}</h3>
        <p className="text-sm text-gray-500 text-center">{role}</p>
        </div>
    );
    }