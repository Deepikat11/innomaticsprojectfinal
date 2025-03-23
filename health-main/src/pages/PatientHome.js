import React, { useState, useRef, useEffect } from 'react';
import '../styles/PatientHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faSearch,
  faUser ,
  faCalendarAlt,
  faHeart,
  faMapMarkerAlt,
  faEnvelope,
  faBell,
  faAmbulance,
  faChevronRight,
  faChevronLeft,
  faStar,
  faPhoneAlt,
  faClipboardList,
  faFileAlt,
  faStethoscope,
  faFileMedical,
  faHospital
} from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

// Placeholder doctor images
const doctorImages = [
  'https://i.pinimg.com/736x/f4/c9/ef/f4c9ef33d04a22050038e9e53eeb7d85.jpg',
  'https://thumbs.dreamstime.com/b/smiling-doctor-man-standing-straight-clinic-102540376.jpg',

  'https://i.pinimg.com/736x/f4/c9/ef/f4c9ef33d04a22050038e9e53eeb7d85.jpg',
  'https://thumbs.dreamstime.com/b/smiling-doctor-man-standing-straight-clinic-102540376.jpg',
  'https://www.shutterstock.com/image-photo/portrait-asian-female-doctor-wearing-600nw-2502070973.jpg',
  'https://png.pngtree.com/png-clipart/20240220/original/pngtree-portrait-of-a-smiling-handsome-male-doctor-man-png-image_14366794.png',
  'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/1/6/1420566268118/Woman-doctor-012.jpg?width=465&dpr=1&s=none&crop=none',
  'https://media.gettyimages.com/id/1390000431/photo/shot-of-a-mature-doctor-using-a-digital-tablet-in-a-modern-hospital.jpg?s=612x612&w=gi&k=20&c=jFX76izk91Buv15I1TuRfTYYU4BXsz7PaVz3IjndebU=',
  'https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg',
   'https://www.shutterstock.com/image-photo/portrait-young-asian-male-doctor-260nw-2141952443.jpg',
    'https://www.shutterstock.com/image-photo/young-handsome-doctor-man-clinic-260nw-1271532457.jpg',
    'https://www.shutterstock.com/image-photo/portrait-friendly-middle-aged-european-600nw-2281024719.jpg',
    'https://img.freepik.com/free-photo/cheerful-doctor-with-hands-pockets_23-2147763875.jpg?semt=ais_hybrid',
    'https://www.shutterstock.com/image-photo/medical-career-female-doctor-smiling-260nw-1511701145.jpg',
    'https://cdn.create.vista.com/api/media/small/20798293/stock-photo-doctor-man-with-stethoscope',
     'https://c8.alamy.com/comp/EMH5D5/friendly-doctor-man-posing-with-folded-arms-isolated-in-a-white-background-EMH5D5.jpg',
     'https://c8.alamy.com/comp/F95PM8/smiling-medical-doctor-man-with-stethoscope-isolated-on-white-background-F95PM8.jpg',
     'https://png.pngtree.com/thumb_back/fw800/background/20221115/pngtree-confident-young-medical-doctor-modern-job-hospital-photo-image_40615010.jpg',
      'https://png.pngtree.com/background/20230331/original/pngtree-the-young-man-doctor-in-medical-concept-young-man-doctor-in-picture-image_2223018.jpg',
  // Add more images as needed
];

// Health tips data
const healthTipsData = [ { tip: 'Stay Hydrated: Drink at least 8 glasses of water daily to maintain optimal body functions and energy levels.', image: 'https://thumbs.dreamstime.com/b/celebrate-world-water-day-clean-drop-fresh-blue-ripples-saving-environment-embracing-ecology-featuring-nasa-349203350.jpg' }, 
  { tip: 'Exercise Regularly: Aim for at least 30 minutes of physical activity each day to improve cardiovascular health and boost mood.', image: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2015_18/512061/exercise-outside-woman-stock-today-150427-tease.jpg' },
   { tip: 'Eat Healthy: Include plenty of fruits, vegetables, and whole grains in your diet for essential nutrients and better digestion.', image: 'https://media.istockphoto.com/id/1409236261/photo/healthy-food-healthy-eating-background-fruit-vegetable-berry-vegetarian-eating-superfood.jpg?s=612x612&w=0&k=20&c=kYZKgwsQbH_Hscl3mPRKkus0h1OPuL0TcXxZcO2Zdj0=' },
    { tip: 'Get Enough Sleep: Aim for 7-8 hours of quality sleep each night to support immune function and mental clarity.', image: 'https://www.cdc.gov/sleep/media/images/Sleep-WomanPeacefullySleeping-1217582444.jpg' },
     { tip: 'Manage Stress: Practice relaxation techniques like meditation or yoga to reduce stress and improve overall wellbeing.', image: 'https://ananda.ai/wp-content/uploads/2022/10/vlog-60-1024x536.jpg' }, 
     { tip: 'Limit Screen Time: Take regular breaks from digital devices to reduce eye strain and improve sleep quality.', image: 'https://bia.ca/wp-content/uploads/2017/05/61076975_m-Mindfulness.jpg' }, 
     { tip: 'Practice Mindfulness: Take a few minutes each day to practice mindfulness techniques to improve mental health.', image: 'https://www.wellmark.com/-/media/sites/blue-magazine/2019-content-marketing/june-publish/full_screentime_info.png?sc_lang=en&hash=3109294B48BE325935F6B079FA68F23D' } ];

// Doctor availability times
const availabilityData = {
  'Dr. Smith': ['Mon 9-5', 'Wed 10-6', 'Fri 8-3'],
  'Dr. Jane': ['Tue 8-4', 'Thu 9-5', 'Sat 10-2'],
  'Dr. Adams': ['Mon 10-4', 'Thu 11-7', 'Fri 9-5'],
  'Dr. Alex': ['Tue 9-3', 'Wed 1-7', 'Sat 9-1'],
  'Dr. Anne': ['Mon 8-2', 'Thu 9-5', 'Fri 10-6'],
  'Dr. Kim': ['Tue 10-6', 'Wed 9-5', 'Sat 8-12'],
  'Dr. Johnson': ['Mon 11-7', 'Thu 8-4', 'Fri 9-3'],
  'Dr. Garcia': ['Tue 9-5', 'Wed 10-6', 'Sat 10-4'],
  'Dr. Brown': ['Mon 9-1', 'Thu 1-7', 'Fri 10-6'],
  'Dr. Wilson': ['Tue 8-2', 'Wed 12-6', 'Sat 9-3'],
  'Dr. Thomas': ['Mon 10-6', 'Thu 8-4', 'Fri 9-5'],
  'Dr. Davis': ['Tue 9-5', 'Wed 10-6', 'Sat 11-3'],
  'Dr. Martinez': ['Mon 8-4', 'Thu 9-5', 'Fri 10-2'],
  'Dr. Alexa': ['Tue 9-1', 'Wed 11-7', 'Sat 8-12'],
  'Dr. Lewis': ['Mon 10-5', 'Thu 1-6', 'Fri 9-4'],
  'Dr. Walker': ['Tue 8-4', 'Wed 9-3', 'Sat 10-2'],
  'Dr. Hall': ['Mon 9-5', 'Thu 12-6', 'Fri 10-6'],
  'Dr. Allen': ['Tue 10-6', 'Wed 8-2', 'Sat 9-1']
  // Add more doctors as needed
};


// Doctor ratings and specialty data
const doctorDetails = {
  'Dr. Smith': { specialty: 'Cardiologist', rating: 4.8, patients: 1200, experience: 10 },
  'Dr. Jane': { specialty: 'Dermatologist', rating: 4.7, patients: 900, experience: 7 },
  'Dr. Adams': { specialty: 'Neurologist', rating: 4.9, patients: 1100, experience: 12 },
  'Dr. Alex': { specialty: 'Pediatrician', rating: 4.6, patients: 800, experience: 6 },
  'Dr. Anne': { specialty: 'Orthopedic Surgeon', rating: 4.8, patients: 950, experience: 9 },
  'Dr. Kim': { specialty: 'Oncologist', rating: 4.7, patients: 780, experience: 8 },
  'Dr. Johnson': { specialty: 'Psychiatrist', rating: 4.5, patients: 850, experience: 7 },
  'Dr. Garcia': { specialty: 'ENT Specialist', rating: 4.6, patients: 720, experience: 5 },
  'Dr. Brown': { specialty: 'Urologist', rating: 4.7, patients: 650, experience: 8 },
  'Dr. Wilson': { specialty: 'Pulmonologist', rating: 4.8, patients: 900, experience: 10 },
  'Dr. Thomas': { specialty: 'General Surgeon', rating: 4.9, patients: 1300, experience: 13 },
  'Dr. Davis': { specialty: 'Endocrinologist', rating: 4.6, patients: 770, experience: 6 },
  'Dr. Martinez': { specialty: 'Nephrologist', rating: 4.7, patients: 820, experience: 9 },
  'Dr. Alexa': { specialty: 'Ophthalmologist', rating: 4.5, patients: 680, experience: 5 },
  'Dr. Lewis': { specialty: 'Rheumatologist', rating: 4.6, patients: 740, experience: 7 },
  'Dr. Walker': { specialty: 'Gastroenterologist', rating: 4.8, patients: 960, experience: 10 },
  'Dr. Hall': { specialty: 'Hematologist', rating: 4.7, patients: 880, experience: 8 },
  'Dr. Allen': { specialty: 'Allergist', rating: 4.6, patients: 710, experience: 6 }
  // Add more doctors as needed
};

const PatientHome = () => {
  const [search, setSearch] = useState('');
  const [tipIndex, setTipIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const doctorsContainerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [appointmentData, setAppointmentData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });
  const [nextAppointments, setNextAppointments] = useState([]);

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setNextAppointments(savedAppointments);
  
    const interval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % healthTipsData.length);
    }, 5000);
  
    return () => clearInterval(interval);
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setSuccessMessage(`Searching for doctors related to "${search}"`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (appointmentData.doctor && appointmentData.date && appointmentData.time) {
      const updatedAppointments = [...nextAppointments, appointmentData];
      setNextAppointments(updatedAppointments);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  
      setSuccessMessage(`Appointment booked with ${appointmentData.doctor} on ${appointmentData.date} at ${appointmentData.time}`);
      setAppointmentData({ doctor: '', date: '', time: '', reason: '' });
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };
  
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSuccessMessage('Your message has been sent! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleEmergency = () => {
    setSuccessMessage('Emergency services contacted! Help is on the way.');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDoctorClick = (doctorName) => {
    setSelectedDoctor(doctorName);
    setShowDoctorModal(true);
  };

  const handleDoctorSelect = (doctorName) => {
    setAppointmentData({
      ...appointmentData,
      doctor: doctorName
    });
    
    setShowDoctorModal(false);
    
    // Scroll to booking section
    document.querySelector('.booking-section').scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    
    if (formType === 'contact') {
      setFormData({
        ...formData,
        [name]: value
      });
    } else if (formType === 'appointment') {
      setAppointmentData({
        ...appointmentData,
        [name]: value
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % healthTipsData.length);
    }, 5000); // Change tip every 5 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  const scrollDoctors = (direction) => {
    if (doctorsContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      doctorsContainerRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  // Get today's date for min attribute in date input
  const today = new Date().toISOString().split('T')[0];

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const user = JSON.parse(localStorage.getItem('user'));
  const [filteredDoctors, setFilteredDoctors] = useState(Object.keys(doctorDetails));

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredDoctors(Object.keys(doctorDetails));
    } else {
      const query = search.toLowerCase();
      const filtered = Object.keys(doctorDetails).filter(
        (doctor) =>
          doctor.toLowerCase().includes(query) ||
          doctorDetails[doctor].specialty.toLowerCase().includes(query)
      );
      setFilteredDoctors(filtered);
    }
  }, [search]);

  const scrollToRecommended = () => {
    const section = document.querySelector('.recommended-doctors-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      section.classList.add('highlight-section');
      setTimeout(() => {
        section.classList.remove('highlight-section');
      }, 1500);
    }
  };
  
  

  return (
    <div className="patient-container">
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
      
      <header className="patient-header">
        <h1><FontAwesomeIcon icon={faHospital} /> HealthConnect Patient Portal</h1>
        <div className="profile-icon" onClick={handleProfileClick}>
          <FontAwesomeIcon icon={faUser } size="lg" />
        </div>
        {showProfile && (
          <div className="profile-details">
            <h2><FontAwesomeIcon icon={faUser } /> Your Profile</h2>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>

            <p><strong>Age:</strong> 30</p>
            {/* <p><strong>Email:</strong> john@example.com</p> */}
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Blood Type:</strong> O+</p>
            <button><FontAwesomeIcon icon={faFileAlt} /> Edit Profile</button>
            <button><FontAwesomeIcon icon={faFileMedical} /> Medical Records</button>
            <Link 
              to="/" 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition duration-300"
            >
              Logout
            </Link>
          </div>
        )}
      </header>

      <main className="patient-main">
        <section className="upcoming-appointments-section">
          <h2><FontAwesomeIcon icon={faCalendarAlt} /> Your Upcoming Appointments</h2>
          {nextAppointments.length > 0 ? (
            <div className="appointments-list">
              {nextAppointments.map((apt, index) => (
                <div key={index} className="appointment-card">
                  <div className="appointment-icon">
                    <FontAwesomeIcon icon={faStethoscope} />
                  </div>
                  <div className="appointment-details">
                    <h3>{apt.doctor}</h3>
                    <p><FontAwesomeIcon icon={faCalendarAlt} /> {formatDate(apt.date)} at {apt.time}</p>
                    <p><FontAwesomeIcon icon={faClipboardList} /> {apt.reason}</p>
                  </div>
                  <div className="appointment-actions">
                    <button className="reschedule-btn">Reschedule</button>
                    <button className="cancel-btn">Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-appointments">You have no upcoming appointments scheduled.</p>
          )}
        </section>

        {/* <section className="find-doctor-section">
  <h2><FontAwesomeIcon icon={faSearch} /> Find a Doctor</h2>
  <div className="search-input-container">
    <input
      type="text"
      placeholder="Search by specialty, condition, or doctor name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    {search && (
      <div className="suggestions-list">
        {Object.keys(doctorDetails)
          .filter((doctor) =>
            doctor.toLowerCase().includes(search.toLowerCase()) ||
            doctorDetails[doctor].specialty.toLowerCase().includes(search.toLowerCase())
          )
          .map((doctor, idx) => (
            <div key={idx} className="suggestion-item" onClick={() => handleDoctorClick(doctor)}>
              {doctor} - {doctorDetails[doctor].specialty}
            </div>
          ))}
      </div>
    )}
  </div> */}
{/* </section> */}


        {/* <section className="find-doctor-section">
          <h2><FontAwesomeIcon icon={faSearch} /> Find a Doctor</h2>
          <form onSubmit={handleSearch}>
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search by specialty, condition, or doctor name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">Search</button>
            </div>
          </form>
        </section> */}

<section className="find-doctor-section">
  <h2><FontAwesomeIcon icon={faSearch} /> Find a Doctor</h2>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      scrollToRecommended();
    }}
  >
    <div className="search-input-container">
      <input
        type="text"
        placeholder="Search by specialty, condition, or doctor name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">Search!!</button>
    </div>
  </form>
</section>

<section className={`recommended-doctors-section`}>
  <h2><FontAwesomeIcon icon={faStar} /> Recommended Doctors</h2>
  <div className="doctors-scroll-container">
    <button className="scroll-button left" onClick={() => scrollDoctors(-1)}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
    <div className="doctors-container" ref={doctorsContainerRef}>
      {filteredDoctors.length > 0
        ? filteredDoctors.map((doctorName, index) => (
            <div
              className="doctor-card"
              key={index}
              onClick={() => handleDoctorClick(doctorName)}
            >
              <div className="doctor-rating">
                <span>{doctorDetails[doctorName].rating}</span>
                <FontAwesomeIcon icon={faStar} />
              </div>
              <img
                src={doctorImages[index % doctorImages.length]}
                alt={doctorName}
              />
              <h3>{doctorName}</h3>
              <p>{doctorDetails[doctorName].specialty}</p>
              <p>{doctorDetails[doctorName].experience} years experience</p>
              <button
                className="book-now-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDoctorSelect(doctorName);
                }}
              >
                Book Now
              </button>
            </div>
          ))
        : Object.keys(doctorDetails).map((doctorName, index) => (
            <div
              className="doctor-card"
              key={index}
              onClick={() => handleDoctorClick(doctorName)}
            >
              <div className="doctor-rating">
                <span>{doctorDetails[doctorName].rating}</span>
                <FontAwesomeIcon icon={faStar} />
              </div>
              <img
                src={doctorImages[index % doctorImages.length]}
                alt={doctorName}
              />
              <h3>{doctorName}</h3>
              <p>{doctorDetails[doctorName].specialty}</p>
              <p>{doctorDetails[doctorName].experience} years experience</p>
              <button
                className="book-now-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDoctorSelect(doctorName);
                }}
              >
                Book Now
              </button>
            </div>
          ))}
    </div>
    <button className="scroll-button right" onClick={() => scrollDoctors(1)}>
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  </div>
</section>


        <section className="booking-section">
          <h2><FontAwesomeIcon icon={faCalendarAlt} /> Book an Appointment</h2>
          <form onSubmit={handleBooking} className="booking-form">
            <div className="form-group">
              <label htmlFor="doctor">Doctor:</label>
              <select 
                id="doctor" 
                name="doctor" 
                value={appointmentData.doctor}
                onChange={(e) => handleInputChange(e, 'appointment')}
                required
              >
                <option value="">Select a doctor</option>
                {Object.keys(availabilityData).map((doctor, index) => (
                  <option key={index} value={doctor}>{doctor}</option>
                ))}
              </select>
            </div>
            
            {appointmentData.doctor && (
              <div className="availability-info">
                <h4>Available Times:</h4>
                <ul>
                  {availabilityData[appointmentData.doctor].map((time, index) => (
                    <li key={index}>{time}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input 
                type="date" 
                id="date" 
                name="date"
                min={today}
                value={appointmentData.date}
                onChange={(e) => handleInputChange(e, 'appointment')}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="time">Time:</label>
              <input 
                type="time" 
                id="time" 
                name="time"
                value={appointmentData.time}
                onChange={(e) => handleInputChange(e, 'appointment')}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="reason">Reason for Visit:</label>
              <textarea 
                id="reason" 
                name="reason"
                placeholder="Briefly describe your symptoms or reason for visit"
                value={appointmentData.reason}
                onChange={(e) => handleInputChange(e, 'appointment')}
              ></textarea>
            </div>
            
            <button type="submit"><FontAwesomeIcon icon={faCalendarAlt} /> Book Appointment</button>
          </form>
        </section>

        <section className="health-tips-section">
          <h2><FontAwesomeIcon icon={faHeart} /> Health Tips & Wellness</h2>
          <div className="health-tip">
            <img src={healthTipsData[tipIndex].image} alt="Health Tip" className="health-tip-image" />
            <p className="health-tip-text">{healthTipsData[tipIndex].tip}</p>
          </div>
          <div className="tip-navigation">
            <button onClick={() => setTipIndex((tipIndex - 1 + healthTipsData.length) % healthTipsData.length)}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span>{tipIndex + 1} of {healthTipsData.length}</span>
            <button onClick={() => setTipIndex((tipIndex + 1) % healthTipsData.length)}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </section>

        <section className="emergency-section">
          <h2><FontAwesomeIcon icon={faAmbulance} /> Emergency Services</h2>
          <div className="emergency-info">
            <p>For medical emergencies, please call emergency services immediately or use our emergency request button below.</p>
            <button onClick={handleEmergency}>
              <FontAwesomeIcon icon={faAmbulance} /> Request Emergency Services
            </button>
            <div className="emergency-contacts">
              <p><strong>Emergency Hotline:</strong> 911</p>
              <p><strong>24/7 Nurse Line:</strong> (800) 555-1234</p>
              <p><strong>Poison Control:</strong> (800) 222-1222</p>
              <p><strong>Mental Health Crisis Line:</strong> (988)</p>
            </div>
            <div className="emergency-tips">
              <h3>Emergency Preparedness Tips</h3>
              <ul>
                <li>Keep important medical information easily accessible</li>
                <li>Know the location of your nearest emergency room</li>
                <li>Always keep emergency contacts updated in your profile</li>
                <li>If experiencing chest pain, difficulty breathing, or severe bleeding, call 911 immediately</li>
              </ul>
              <div className="nearest-facilities">
                <h3>Nearest Emergency Facilities</h3>
                <div className="facility-card">
                  <FontAwesomeIcon icon={faHospital} />
                  <div className="facility-info">
                    <h4>Central Hospital Emergency Room</h4>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Medical Center Drive (2.3 miles)</p>
                    <p><FontAwesomeIcon icon={faPhoneAlt} /> (555) 123-4567</p>
                    <p>Average wait time: 25 min</p>
                  </div>
                </div>
                <div className="facility-card">
                  <FontAwesomeIcon icon={faHospital} />
                  <div className="facility-info">
                    <h4>Westside Urgent Care</h4>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 456 Health Parkway (3.8 miles)</p>
                    <p><FontAwesomeIcon icon={faPhoneAlt} /> (555) 987-6543</p>
                    <p>Average wait time: 15 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PatientHome;