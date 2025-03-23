import React, { useState, useRef, useEffect } from 'react';
import '../styles/DoctorHome.css';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCalendarAlt,
  faSearch,
  faStethoscope,
  faClipboardList,
  faNotesMedical,
  faBell,
  faUserMd,
  faChevronRight,
  faChevronLeft,
  faEnvelope,
  faPhoneAlt,
  faFileMedical,
  faChartLine,
  faHeartbeat,
  faClock,
  faHospital,
  faPrescriptionBottleAlt,
  faClipboard,
  faCommentMedical,
  faUserPlus,
  faUserFriends,
  faFileAlt,
  faSignOutAlt,
  faCog,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

// Placeholder patient images
const patientImages = [
  'https://randomuser.me/api/portraits/men/75.jpg',
  'https://randomuser.me/api/portraits/women/65.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/22.jpg',
  'https://randomuser.me/api/portraits/women/54.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/33.jpg',
  'https://randomuser.me/api/portraits/men/62.jpg',
  'https://randomuser.me/api/portraits/women/76.jpg',
  'https://randomuser.me/api/portraits/men/19.jpg',
  'https://randomuser.me/api/portraits/women/24.jpg',
];

// Patient data
const initialSchedule = [
  { time: '09:00 AM', patient: 'John Doe', reason: 'Regular Checkup', duration: '30 mins' },
  { time: '09:45 AM', patient: 'Case Review', reason: 'Review MRI and lab reports', duration: '45 mins' },
  { time: '10:30 AM', patient: 'Lunch Break', duration: '1 hour' },
  { time: '11:30 AM', patient: 'Jane Smith', reason: 'Follow-up', duration: '30 mins' },
  { time: '12:00 PM', patient: 'Tea Break', duration: '15 mins' },
  { time: '12:30 PM', patient: 'Michael Brown', reason: 'Diabetes Consultation', duration: '30 mins' }
];

// Original patient data
const initialPatientData = {
  'John Smith': { age: 45, gender: 'Male', lastVisit: '2025-02-15', condition: 'Hypertension', nextAppt: '2025-03-25', status: 'Stable' },
  'Sarah Johnson': { age: 32, gender: 'Female', lastVisit: '2025-03-01', condition: 'Pregnancy (28 weeks)', nextAppt: '2025-03-29', status: 'Monitoring' },
  'Michael Brown': { age: 58, gender: 'Male', lastVisit: '2025-03-10', condition: 'Type 2 Diabetes', nextAppt: '2025-04-10', status: 'Review Needed' },
  'Emily Davis': { age: 27, gender: 'Female', lastVisit: '2025-03-05', condition: 'Asthma', nextAppt: '2025-06-05', status: 'Stable' },
  'Robert Wilson': { age: 62, gender: 'Male', lastVisit: '2025-03-12', condition: 'Post-Stroke Monitoring', nextAppt: '2025-04-02', status: 'Improving' },
  'Jennifer Garcia': { age: 35, gender: 'Female', lastVisit: '2025-02-28', condition: 'Migraines', nextAppt: '2025-04-28', status: 'Stable' },
  'David Martinez': { age: 41, gender: 'Male', lastVisit: '2025-03-08', condition: 'Lower Back Pain', nextAppt: '2025-03-22', status: 'Follow-up' },
  'Lisa Anderson': { age: 29, gender: 'Female', lastVisit: '2025-03-15', condition: 'Anxiety Disorder', nextAppt: '2025-04-15', status: 'Monitoring' },
  'James Taylor': { age: 55, gender: 'Male', lastVisit: '2025-03-10', condition: 'High Cholesterol', nextAppt: '2025-06-10', status: 'Stable' },
  'Michelle Thomas': { age: 38, gender: 'Female', lastVisit: '2025-03-07', condition: 'Hypothyroidism', nextAppt: '2025-04-07', status: 'Review Needed' },
  'Richard Moore': { age: 67, gender: 'Male', lastVisit: '2025-03-03', condition: 'Arthritis', nextAppt: '2025-04-03', status: 'Stable' },
  'Patricia White': { age: 49, gender: 'Female', lastVisit: '2025-03-18', condition: 'Insomnia', nextAppt: '2025-04-18', status: 'New Treatment' },
};

// Medical article data
const medicalArticles = [
  {
    title: 'New Guidelines for Hypertension Management',
    journal: 'Journal of Cardiology',
    date: 'March 15, 2025',
    summary: 'Updated recommendations for blood pressure management emphasize lifestyle modifications and personalized medication approaches.'
  },
  {
    title: 'Advancements in Telehealth for Chronic Disease Management',
    journal: 'Digital Medicine Today',
    date: 'March 10, 2025',
    summary: 'Recent studies show improved outcomes for patients using integrated telehealth platforms for ongoing condition monitoring.'
  },
  {
    title: 'Artificial Intelligence in Diagnostic Imaging',
    journal: 'Medical Imaging Research',
    date: 'March 5, 2025',
    summary: 'AI algorithms demonstrate promising results in early detection of abnormalities in radiological scans.'
  },
  {
    title: 'Precision Medicine Approaches for Diabetes Care',
    journal: 'Endocrinology Review',
    date: 'February 28, 2025',
    summary: 'Customized treatment plans based on genetic profiles show improved glycemic control in clinical trials.'
  },
];

// Daily schedule data
const scheduleData = [
  { time: '09:00 AM', patient: 'John Smith', reason: 'Follow-up: Hypertension', duration: '30 min' },
  { time: '09:30 AM', patient: 'Sarah Johnson', reason: 'Prenatal checkup', duration: '45 min' },
  { time: '10:15 AM', patient: 'Michael Brown', reason: 'Diabetes Management', duration: '30 min' },
  { time: '10:45 AM', patient: 'Emily Davis', reason: 'Asthma Review', duration: '30 min' },
  { time: '11:15 AM', patient: 'Staff Meeting', reason: 'Weekly department update', duration: '45 min' },
  { time: '12:00 PM', patient: 'Lunch Break', reason: '', duration: '60 min' },
  { time: '01:00 PM', patient: 'Robert Wilson', reason: 'Post-Stroke Follow-up', duration: '45 min' },
  { time: '01:45 PM', patient: 'Jennifer Garcia', reason: 'Migraine Treatment Review', duration: '30 min' },
  { time: '02:15 PM', patient: 'David Martinez', reason: 'Back Pain Evaluation', duration: '30 min' },
  { time: '02:45 PM', patient: 'Lisa Anderson', reason: 'Medication Review: Anxiety', duration: '30 min' },
  { time: '03:15 PM', patient: 'Patient Documentation', reason: '', duration: '45 min' },
  { time: '04:00 PM', patient: 'James Taylor', reason: 'Cholesterol Follow-up', duration: '30 min' },
  { time: '04:30 PM', patient: 'Michelle Thomas', reason: 'Thyroid Evaluation', duration: '30 min' },
];

// Notification data
const notificationData = [
  {
    type: 'appointment',
    message: 'New appointment request from Patricia White for April 5',
    time: '10 mins ago'
  },
  {
    type: 'lab',
    message: 'Lab results available for Michael Brown',
    time: '1 hour ago'
  },
  {
    type: 'message',
    message: 'Message from Dr. Johnson regarding patient referral',
    time: '2 hours ago'
  },
  {
    type: 'update',
    message: 'EMR system update scheduled for tonight at 2 AM',
    time: '3 hours ago'
  },
  {
    type: 'prescription',
    message: 'Prescription renewal request from John Smith',
    time: '5 hours ago'
  },
];

const DoctorHome = () => {
  const doctor = JSON.parse(localStorage.getItem('user')) || {};
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [articleIndex, setArticleIndex] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [patientNote, setPatientNote] = useState('');
  const patientsContainerRef = useRef(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentReason: ''
  });
  const [dynamicSchedule, setDynamicSchedule] = useState([...initialSchedule]); 
  const [patientData, setPatientData] = useState({...initialPatientData});
  
  // Add New Patient State
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [newPatientData, setNewPatientData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    condition: '',
    status: 'New Patient',
    lastVisit: '',
    nextAppt: '',
    notes: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setSuccessMessage(`Searching for patient: "${search}"`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
    if (showNotifications) setShowNotifications(false);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    if (showProfile) setShowProfile(false);
  };

  const handlePatientClick = (patientName) => {
    setSelectedPatient(patientName);
    setShowPatientModal(true);
  };

  const handleSaveNote = () => {
    if (patientNote.trim() && selectedPatient) {
      setSuccessMessage(`Note saved for ${selectedPatient}`);
      setPatientNote('');
      setShowPatientModal(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Helper function to convert time from 24-hour format to 12-hour format with AM/PM
  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${suffix}`;
  };

  // Function to check if a date string is today
  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Function to insert appointment in correct time order
  const insertAppointmentInOrder = (newAppointment, schedule) => {
    // Convert all times to minutes since midnight for comparison
    const getMinutesSinceMidnight = (timeString) => {
      const [time, period] = timeString.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const newAppointmentMinutes = getMinutesSinceMidnight(newAppointment.time);
    
    // Find the correct position to insert the new appointment
    let insertIndex = schedule.length;
    for (let i = 0; i < schedule.length; i++) {
      const currentMinutes = getMinutesSinceMidnight(schedule[i].time);
      if (newAppointmentMinutes < currentMinutes) {
        insertIndex = i;
        break;
      }
    }
    
    // Create a new schedule with the appointment inserted at the correct position
    const newSchedule = [
      ...schedule.slice(0, insertIndex),
      newAppointment,
      ...schedule.slice(insertIndex)
    ];
    
    return newSchedule;
  };

  const handleScheduleAppointment = (e) => {
    e.preventDefault();
    const { patientName, appointmentDate, appointmentTime, appointmentReason } = formData;
    
    if (patientName && appointmentDate && appointmentTime) {
      setSuccessMessage(`Appointment scheduled with ${patientName} on ${appointmentDate} at ${appointmentTime}`);
      
      // Check if the appointment is for today
      if (isToday(appointmentDate)) {
        // Create a new appointment object
        const newAppointment = {
          time: convertTo12HourFormat(appointmentTime),
          patient: patientName,
          reason: appointmentReason || `New Appointment`,
          duration: '30 mins'
        };
        
        // Insert the new appointment in the correct time order
        const updatedSchedule = insertAppointmentInOrder(newAppointment, dynamicSchedule);
        setDynamicSchedule(updatedSchedule);
      }
      
      // Reset the form
      setFormData({
        patientName: '',
        patientEmail: '',
        appointmentDate: '',
        appointmentTime: '',
        appointmentReason: ''
      });
      
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Add New Patient Input Change Handler
  const handleNewPatientInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatientData({
      ...newPatientData,
      [name]: value
    });
  };

  // Add New Patient Form Submit Handler
  const handleAddNewPatient = (e) => {
    e.preventDefault();
    
    // Create full name from first and last name
    const fullName = `${newPatientData.firstName} ${newPatientData.lastName}`;
    
    // Format the date for last visit (if any) or use today's date
    const lastVisit = newPatientData.lastVisit || new Date().toISOString().split('T')[0];
    
    // Format the date for next appointment (if any) or calculate a default (2 weeks from now)
    const nextApptDate = newPatientData.nextAppt || (() => {
      const date = new Date();
      date.setDate(date.getDate() + 14); // 2 weeks from now as default
      return date.toISOString().split('T')[0];
    })();
    
    // Create the new patient object
    const newPatient = {
      age: parseInt(newPatientData.age, 10),
      gender: newPatientData.gender,
      lastVisit: lastVisit,
      condition: newPatientData.condition,
      nextAppt: nextApptDate,
      status: newPatientData.status
    };
    
    // Add to the patient data
    setPatientData(prevData => ({
      ...prevData,
      [fullName]: newPatient
    }));
    
    // Show success message
    setSuccessMessage(`New patient ${fullName} has been added successfully`);
    
    // Reset the form and close the modal
    setNewPatientData({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      email: '',
      phone: '',
      address: '',
      condition: '',
      status: 'New Patient',
      lastVisit: '',
      nextAppt: '',
      notes: ''
    });
    
    setShowAddPatientModal(false);
    
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const scrollPatients = (direction) => {
    if (patientsContainerRef.current) {
      const scrollAmount = 300;
      patientsContainerRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setArticleIndex((prevIndex) => (prevIndex + 1) % medicalArticles.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Today's date for schedule displays
  const today = new Date();
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, dateOptions);

  // Filter patients by status tab
  const filterPatientsByStatus = () => {
    if (activeTab === 'all') {
      return Object.keys(patientData);
    } else {
      return Object.keys(patientData).filter(patient => {
        if (activeTab === 'review' && patientData[patient].status.includes('Review')) return true;
        if (activeTab === 'follow-up' && patientData[patient].status.includes('Follow-up')) return true;
        if (activeTab === 'stable' && patientData[patient].status.includes('Stable')) return true;
        if (activeTab === 'monitoring' && patientData[patient].status.includes('Monitoring')) return true;
        return false;
      });
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="doctor-container">
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
      
      <header className="doctor-header">
        <h1><FontAwesomeIcon icon={faHospital} /> HealthConnect Doctor Portal</h1>
        <div className="header-icons">
          <div className="notification-icon" onClick={handleNotificationsClick}>
            <FontAwesomeIcon icon={faBell} size="lg" />
            <span className="notification-badge">{notificationData.length}</span>
          </div>
          <div className="profile-icon" onClick={handleProfileClick}>
            <FontAwesomeIcon icon={faUserMd} size="lg" />
          </div>
        </div>
        
        {showProfile && (
          <div className="profile-details">
            <h2><FontAwesomeIcon icon={faUserMd} /> Dr. {doctor.name}</h2>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Office:</strong> Room 315, Main Building</p>
            <div className="profile-actions">
              <button><FontAwesomeIcon icon={faFileAlt} /> Edit Profile</button>
              <button><FontAwesomeIcon icon={faCog} /> Settings</button>
              <button className="signout-btn" 
                onClick={() => {
                  localStorage.clear();
                  navigate('/'); 
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
              </button>
            </div>
          </div>
        )}
        
        {showNotifications && (
          <div className="notifications-panel">
            <h2><FontAwesomeIcon icon={faBell} /> Notifications</h2>
            {notificationData.map((notification, index) => (
              <div key={index} className={`notification-item ${notification.type}`}>
                <div className="notification-icon">
                  {notification.type === 'appointment' && <FontAwesomeIcon icon={faCalendarAlt} />}
                  {notification.type === 'lab' && <FontAwesomeIcon icon={faFileMedical} />}
                  {notification.type === 'message' && <FontAwesomeIcon icon={faEnvelope} />}
                  {notification.type === 'update' && <FontAwesomeIcon icon={faBell} />}
                  {notification.type === 'prescription' && <FontAwesomeIcon icon={faPrescriptionBottleAlt} />}
                </div>
                <div className="notification-content">
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
              </div>
            ))}
            <button className="view-all-btn">View All Notifications</button>
          </div>
        )}
      </header>

      <main className="doctor-main">
        <section className="daily-schedule-section">
          <h2><FontAwesomeIcon icon={faCalendarAlt} /> Today's Schedule: {formattedDate}</h2>
          <div className="schedule-container">
          <div className="timeline">
          {dynamicSchedule.map((appointment, index) => (
  <div 
    key={index} 
    className={`timeline-item ${
      appointment.patient === 'Lunch Break' || 
      appointment.patient === 'Staff Meeting' || 
      appointment.patient === 'Patient Documentation' || 
      appointment.patient === 'Tea Break' || 
      appointment.patient === 'Case Review' 
        ? 'non-patient' 
        : ''
    }`}
  >
    <div className="time-slot">
      <span className="time">{appointment.time}</span>
      <span className="duration">{appointment.duration}</span>
    </div>
    <div className="appointment-details">
      <h3>{appointment.patient}</h3>
      {appointment.reason && <p>{appointment.reason}</p>}
      {!(appointment.patient === 'Lunch Break' || appointment.patient === 'Staff Meeting' || appointment.patient === 'Patient Documentation' || appointment.patient === 'Tea Break' || appointment.patient === 'Case Review') && (
        <div className="appointment-actions">
          <button className="view-record-btn">
            <FontAwesomeIcon icon={faFileMedical} /> Records
          </button>
          <button className="start-btn">
            <FontAwesomeIcon icon={faStethoscope} /> Start
          </button>
        </div>
      )}
    </div>
  </div>
))}

</div>

            </div>
          
        </section>

        <section className="patient-management-section">
          <h2><FontAwesomeIcon icon={faUserFriends} /> Patient Management</h2>
          <div className="status-tabs">
            <button 
              className={activeTab === 'all' ? 'active' : ''} 
              onClick={() => setActiveTab('all')}
            >
              All Patients
            </button>
            <button 
              className={activeTab === 'review' ? 'active' : ''} 
              onClick={() => setActiveTab('review')}
            >
              Needs Review
            </button>
            <button 
              className={activeTab === 'follow-up' ? 'active' : ''} 
              onClick={() => setActiveTab('follow-up')}
            >
              Follow-up
            </button>
            <button 
              className={activeTab === 'stable' ? 'active' : ''} 
              onClick={() => setActiveTab('stable')}
            >
              Stable
            </button>
            <button 
              className={activeTab === 'monitoring' ? 'active' : ''} 
              onClick={() => setActiveTab('monitoring')}
            >
              Monitoring
            </button>
          </div>
          
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search patients by name, condition, or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">
                <FontAwesomeIcon icon={faSearch} /> Search
              </button>
            </div>
          </form>
          
          <div className="patients-scroll-container">
            <button className="scroll-button left" onClick={() => scrollPatients(-1)}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="patients-container" ref={patientsContainerRef}>
              {filterPatientsByStatus().map((patientName, index) => (
                <div 
                  className={`patient-card ${patientData[patientName].status.toLowerCase().replace(' ', '-')}`}
                  key={index}
                  onClick={() => handlePatientClick(patientName)}
                >
                  <div className="status-indicator">{patientData[patientName].status}</div>
                  <img 
                    src={patientImages[index % patientImages.length]} 
                    alt={patientName} 
                    className="patient-image"
                  />
                  <h3>{patientName}</h3>
                  <p className="patient-details">
                    <span>{patientData[patientName].age} yrs, {patientData[patientName].gender}</span>
                  </p>
                  <p className="patient-condition">{patientData[patientName].condition}</p>
                  <div className="patient-dates">
                    <p><FontAwesomeIcon icon={faCalendarAlt} /> Last: {formatDate(patientData[patientName].lastVisit)}</p>
                    <p><FontAwesomeIcon icon={faCalendarAlt} /> Next: {formatDate(patientData[patientName].nextAppt)}</p>
                  </div>
                  <div className="patient-actions">
                    <button className="records-btn">
                      <FontAwesomeIcon icon={faFileMedical} /> Records
                    </button>
                    <button className="message-btn">
                      <FontAwesomeIcon icon={faCommentMedical} /> Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="scroll-button right" onClick={() => scrollPatients(1)}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </section>

        <div className="two-column-layout">
          <section className="analytics-section">
            <h2><FontAwesomeIcon icon={faChartLine} /> Practice Analytics</h2>
            <div className="analytics-cards">
              <div className="analytics-card">
                <div className="analytics-icon">
                  <FontAwesomeIcon icon={faUserFriends} />
                </div>
                <div className="analytics-data">
                  <h3>Patients Seen</h3>
                  <p className="analytics-number">27</p>
                  <p className="analytics-period">This Week</p>
                </div>
              </div>
              
              <div className="analytics-card">
                <div className="analytics-icon">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="analytics-data">
                  <h3>Average Visit</h3>
                  <p className="analytics-number">32 min</p>
                  <p className="analytics-period">This Month</p>
                </div>
              </div>
              
              <div className="analytics-card">
                <div className="analytics-icon">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
                <div className="analytics-data">
                  <h3>Appointments</h3>
                  <p className="analytics-number">15</p>
                  <p className="analytics-period">Next Week</p>
                </div>
              </div>
              
              <div className="analytics-card">
                <div className="analytics-icon">
                  <FontAwesomeIcon icon={faHeartbeat} />
                </div>
                <div className="analytics-data">
                  <h3>Patient Satisfaction</h3>
                  <p className="analytics-number">94%</p>
                  <p className="analytics-period">Last 30 Days</p>
                </div>
              </div>
            </div>
            
            <div className="view-more-analytics">
              <button>View Detailed Reports <FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
          </section>

        

          <section className="medical-updates-section">
            <h2><FontAwesomeIcon icon={faNotesMedical} /> Medical Updates</h2>
            <div className="medical-article">
              <h3>{medicalArticles[articleIndex].title}</h3>
              <p className="article-source">
                <span>{medicalArticles[articleIndex].journal}</span> • 
                <span>{medicalArticles[articleIndex].date}</span>
              </p>
              <p className="article-summary">{medicalArticles[articleIndex].summary}</p>
              <button className="read-more-btn">Read Full Article</button>
            </div>
            <div className="article-navigation">
              <button onClick={() => setArticleIndex((articleIndex - 1 + medicalArticles.length) % medicalArticles.length)}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <span>{articleIndex + 1} of {medicalArticles.length}</span>
              <button onClick={() => setArticleIndex((articleIndex + 1) % medicalArticles.length)}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </section>
        </div>

        <section className="schedule-appointment-section">
          <h2><FontAwesomeIcon icon={faCalendarAlt} /> Schedule New Appointment</h2>
          <form onSubmit={handleScheduleAppointment} className="appointment-form">
            <div className="form-group">
              <label htmlFor="patientName">Patient Name:</label>
              <select 
                id="patientName" 
                name="patientName" 
                value={formData.patientName}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Patient</option>
                {Object.keys(patientData).map((patient, index) => (
                  <option key={index} value={patient}>{patient}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="patientEmail">Patient Email:</label>
              <input 
                type="email" 
                id="patientEmail" 
                name="patientEmail" 
                placeholder="patient@example.com"
                value={formData.patientEmail}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="appointmentDate">Date:</label>
                <input 
                  type="date" 
                  id="appointmentDate" 
                  name="appointmentDate"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="appointmentTime">Time:</label>
                <input 
                  type="time" 
                  id="appointmentTime" 
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>





            
            <div className="form-group">
              <label htmlFor="appointmentReason">Reason for Appointment:</label>
              <textarea 
                id="appointmentReason" 
                name="appointmentReason"
                placeholder="Brief description of appointment purpose"
                value={formData.appointmentReason}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="schedule-btn">
                <FontAwesomeIcon icon={faCalendarAlt} /> Schedule Appointment
              </button>
              <button type="button" className="add-patient-btn">
                <FontAwesomeIcon icon={faUserPlus} /> Add New Patient
              </button>
            </div>
          </form>
        </section>
      </main>

      {showPatientModal && selectedPatient && (
        <div className="modal-overlay">
          <div className="patient-detail-modal">
            <div className="modal-header">
              <h2>Patient Details</h2>
              <button className="close-btn" onClick={() => setShowPatientModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <div className="patient-info">
                <img 
                  src={patientImages[Object.keys(patientData).indexOf(selectedPatient) % patientImages.length]} 
                  alt={selectedPatient} 
                  className="patient-large-image"
                />
                <div className="patient-details">
                  <h3>{selectedPatient}</h3>
                  <p><strong>Age:</strong> {patientData[selectedPatient].age}</p>
                  <p><strong>Gender:</strong> {patientData[selectedPatient].gender}</p>
                  <p><strong>Condition:</strong> {patientData[selectedPatient].condition}</p>
                  <p><strong>Last Visit:</strong> {formatDate(patientData[selectedPatient].lastVisit)}</p>
                  <p><strong>Next Appointment:</strong> {formatDate(patientData[selectedPatient].nextAppt)}</p>
                  <p><strong>Status:</strong> <span className={`status-tag ${patientData[selectedPatient].status.toLowerCase().replace(' ', '-')}`}>{patientData[selectedPatient].status}</span></p>
                </div>
              </div>
              
              <div className="patient-tabs">
                <button className="active">Medical History</button>
                <button>Lab Results</button>
                <button>Medications</button>
                <button>Appointments</button>
                <button>Notes</button>
              </div>
              
              <div className="patient-tab-content medical-history">
                <h3>Recent Medical History</h3>
                <div className="medical-timeline">
                  <div className="medical-entry">
                    <div className="entry-date">March 10, 2025</div>
                    <div className="entry-content">
                      <h4>Office Visit</h4>
                      <p>Patient reported continued high blood pressure readings at home. Adjusted medication dosage and recommended lifestyle modifications.</p>
                    </div>
                  </div>
                  <div className="medical-entry">
                    <div className="entry-date">February 15, 2025</div>
                    <div className="entry-content">
                      <h4>Annual Physical</h4>
                      <p>Comprehensive examination conducted. Blood pressure elevated at 145/92. CBC and metabolic panel ordered.</p>
                    </div>
                  </div>
                  <div className="medical-entry">
                    <div className="entry-date">January 8, 2025</div>
                    <div className="entry-content">
                      <h4>Urgent Care Visit</h4>
                      <p>Patient presented with flu-like symptoms. Prescribed oseltamivir and recommended rest and hydration.</p>
                    </div>
                  </div>
                </div>
                
                <div className="add-note-section">
                  <h3>Add New Note</h3>
                  <textarea 
                    placeholder="Enter clinical notes here..."
                    value={patientNote}
                    onChange={(e) => setPatientNote(e.target.value)}
                  ></textarea>
                  <div className="note-actions">
                    <button onClick={handleSaveNote}>
                      <FontAwesomeIcon icon={faClipboard} /> Save Note
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faPrescriptionBottleAlt} /> Add Prescription
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="doctor-footer">
        <p>© 2025 HealthConnect - All rights reserved</p>
      </footer>
    </div>
  );
};

export default DoctorHome;
