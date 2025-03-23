const DoctorList = () => {
    // Dummy list for now
    const doctors = [
      { id: 1, name: "Dr. Smith", specialization: "Cardiologist", slots: ["10AM", "2PM"] },
      { id: 2, name: "Dr. Lee", specialization: "Dentist", slots: ["11AM", "4PM"] },
    ];
  
    return (
      <div className="p-4">
        <h2 className="text-xl mb-4">Doctors</h2>
        {doctors.map((doc) => (
          <div key={doc.id} className="border p-2 mb-2">
            <h3 className="font-bold">{doc.name}</h3>
            <p>Specialization: {doc.specialization}</p>
            <p>Available Slots: {doc.slots.join(", ")}</p>
            <button className="bg-green-500 text-white px-2 py-1 mt-2">Book Appointment</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default DoctorList;
  