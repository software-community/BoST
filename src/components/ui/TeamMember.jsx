export default function TeamMember({ name, role, image }) {
    return (
        <div className="text-black bg-gray-200 shadow-2xl w-72 h-auto py-12 rounded-lg flex flex-col flex-none justify-center items-center transform transition duration-300 hover:scale-110">
            <img
            className=" h-40 mb-4 rounded-lg justfiy-center mx-auto items-center"
            src={image}
            alt={name}
        />
        <h3 className="text-lg font-semibold text-center">{name}</h3>
        <p className="text-sm text-gray-900 text-center">{role}</p>
        </div>
    );
    }