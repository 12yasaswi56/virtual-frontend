// import { useState } from "react";
// import '../pagesCSS/Contact.css';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     contactNumber: "",
//     gender: "",
//     profession: "",
//     state: "",
//     city: "",
//     queryType: "",
//     comments: "",
//     file: null,
//   });

//   const [error, setError] = useState("");

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
  
//     if (file) {
//       const allowedTypes = ["application/pdf", "image/jpeg"];
      
//       if (!allowedTypes.includes(file.type)) {
//         setError("Only PDF and JPEG files are allowed.");
//         return;
//       }
  
//       setFormData({ ...formData, file });
//       setError("");
//     }
//   };
  

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.firstName || !formData.lastName || !formData.email || !formData.contactNumber || !formData.comments) {
//       setError("All required fields must be filled!");
//       return;
//     }

//     if (!formData.file) {
//       setError("Please upload a PDF file.");
//       return;
//     }

//     alert("Form submitted successfully!");
//     console.log("Submitted Data:", formData);
//   };

//   return (
//     <div className="contact-form-container">
//       <h2>Contact Us</h2>
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>First Name *</label>
//           <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Last Name *</label>
//           <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Email ID *</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Contact Number *</label>
//           <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label>Gender</label>
//             <select name="gender" value={formData.gender} onChange={handleChange}>
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Profession</label>
//             <select name="profession" value={formData.profession} onChange={handleChange}>
//               <option value="">Select Profession</option>
//               <option value="Student">Student</option>
//               <option value="Businessman">Businessman</option>
//               <option value="Incubator">Incubator</option>
//               <option value="Accelerator">Accelerator</option>
//             </select>
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label>State</label>
//             <select name="state" value={formData.state} onChange={handleChange}>
//               <option value="">Select State</option>
//               <option value="Andhra Pradesh">Andhra Pradesh</option>
//   <option value="Arunachal Pradesh">Arunachal Pradesh</option>
//   <option value="Assam">Assam</option>
//   <option value="Bihar">Bihar</option>
//   <option value="Chhattisgarh">Chhattisgarh</option>
//   <option value="Goa">Goa</option>
//   <option value="Gujarat">Gujarat</option>
//   <option value="Haryana">Haryana</option>
//   <option value="Himachal Pradesh">Himachal Pradesh</option>
//   <option value="Jharkhand">Jharkhand</option>
//   <option value="Karnataka">Karnataka</option>
//   <option value="Kerala">Kerala</option>
//   <option value="Madhya Pradesh">Madhya Pradesh</option>
//   <option value="Maharashtra">Maharashtra</option>
//   <option value="Manipur">Manipur</option>
//   <option value="Meghalaya">Meghalaya</option>
//   <option value="Mizoram">Mizoram</option>
//   <option value="Nagaland">Nagaland</option>
//   <option value="Odisha">Odisha</option>
//   <option value="Punjab">Punjab</option>
//   <option value="Rajasthan">Rajasthan</option>
//   <option value="Sikkim">Sikkim</option>
//   <option value="Tamil Nadu">Tamil Nadu</option>
//   <option value="Telangana">Telangana</option>
//   <option value="Tripura">Tripura</option>
//   <option value="Uttar Pradesh">Uttar Pradesh</option>
//   <option value="Uttarakhand">Uttarakhand</option>
//   <option value="West Bengal">West Bengal</option>

//             </select>
//           </div>

//           <div className="form-group">
//             <label>City</label>
//             <select name="city" value={formData.city} onChange={handleChange}>
//               <option value="">Select City</option>
              


//   {/* Andhra Pradesh */}
//   <option value="Visakhapatnam">Visakhapatnam</option>
//   <option value="Vijayawada">Vijayawada</option>
//   <option value="Tirupati">Tirupati</option>
//   <option value="Guntur">Guntur</option>

//   {/* Arunachal Pradesh */}
//   <option value="Itanagar">Itanagar</option>
  
//   {/* Assam */}
//   <option value="Guwahati">Guwahati</option>
//   <option value="Dibrugarh">Dibrugarh</option>

//   {/* Bihar */}
//   <option value="Patna">Patna</option>
//   <option value="Gaya">Gaya</option>

//   {/* Chhattisgarh */}
//   <option value="Raipur">Raipur</option>
//   <option value="Bhilai">Bhilai</option>

//   {/* Goa */}
//   <option value="Panaji">Panaji</option>
//   <option value="Margao">Margao</option>

//   {/* Gujarat */}
//   <option value="Ahmedabad">Ahmedabad</option>
//   <option value="Surat">Surat</option>
//   <option value="Vadodara">Vadodara</option>
//   <option value="Rajkot">Rajkot</option>

//   {/* Haryana */}
//   <option value="Gurugram">Gurugram</option>
//   <option value="Faridabad">Faridabad</option>

//   {/* Himachal Pradesh */}
//   <option value="Shimla">Shimla</option>
//   <option value="Manali">Manali</option>

//   {/* Jharkhand */}
//   <option value="Ranchi">Ranchi</option>
//   <option value="Jamshedpur">Jamshedpur</option>

//   {/* Karnataka */}
//   <option value="Bangalore">Bangalore</option>
//   <option value="Mysore">Mysore</option>
//   <option value="Mangalore">Mangalore</option>
//   <option value="Hubli">Hubli</option>

//   {/* Kerala */}
//   <option value="Thiruvananthapuram">Thiruvananthapuram</option>
//   <option value="Kochi">Kochi</option>
//   <option value="Kozhikode">Kozhikode</option>

//   {/* Madhya Pradesh */}
//   <option value="Bhopal">Bhopal</option>
//   <option value="Indore">Indore</option>
//   <option value="Gwalior">Gwalior</option>
//   <option value="Jabalpur">Jabalpur</option>

//   {/* Maharashtra */}
//   <option value="Mumbai">Mumbai</option>
//   <option value="Pune">Pune</option>
//   <option value="Nagpur">Nagpur</option>
//   <option value="Nashik">Nashik</option>
//   <option value="Aurangabad">Aurangabad</option>

//   {/* Manipur */}
//   <option value="Imphal">Imphal</option>

//   {/* Meghalaya */}
//   <option value="Shillong">Shillong</option>

//   {/* Mizoram */}
//   <option value="Aizawl">Aizawl</option>

//   {/* Nagaland */}
//   <option value="Kohima">Kohima</option>

//   {/* Odisha */}
//   <option value="Bhubaneswar">Bhubaneswar</option>
//   <option value="Cuttack">Cuttack</option>

//   {/* Punjab */}
//   <option value="Chandigarh">Chandigarh</option>
//   <option value="Ludhiana">Ludhiana</option>
//   <option value="Amritsar">Amritsar</option>

//   {/* Rajasthan */}
//   <option value="Jaipur">Jaipur</option>
//   <option value="Jodhpur">Jodhpur</option>
//   <option value="Udaipur">Udaipur</option>
//   <option value="Kota">Kota</option>

//   {/* Sikkim */}
//   <option value="Gangtok">Gangtok</option>

//   {/* Tamil Nadu */}
//   <option value="Chennai">Chennai</option>
//   <option value="Coimbatore">Coimbatore</option>
//   <option value="Madurai">Madurai</option>
//   <option value="Tiruchirapalli">Tiruchirapalli</option>

//   {/* Telangana */}
//   <option value="Hyderabad">Hyderabad</option>
//   <option value="Warangal">Warangal</option>

//   {/* Tripura */}
//   <option value="Agartala">Agartala</option>

//   {/* Uttar Pradesh */}
//   <option value="Lucknow">Lucknow</option>
//   <option value="Kanpur">Kanpur</option>
//   <option value="Agra">Agra</option>
//   <option value="Varanasi">Varanasi</option>
//   <option value="Allahabad">Allahabad</option>
//   <option value="Noida">Noida</option>

//   {/* Uttarakhand */}
//   <option value="Dehradun">Dehradun</option>
//   <option value="Haridwar">Haridwar</option>

//   {/* West Bengal */}
//   <option value="Kolkata">Kolkata</option>
//   <option value="Durgapur">Durgapur</option>
//   <option value="Asansol">Asansol</option>

//   {/* Union Territories */}
//   <option value="New Delhi">New Delhi</option>
//   <option value="Pondicherry">Pondicherry</option>
//   <option value="Leh">Leh</option>
//   <option value="Port Blair">Port Blair</option>


//             </select>
//           </div>
//         </div>

//         <div className="form-group">
//           <label>Query Type</label>
//           <select name="queryType" value={formData.queryType} onChange={handleChange}>
//             <option value="">Select Query Type</option>
//             <option value="General">General</option>
//             <option value="Technical">Technical</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Comments *</label>
//           <textarea name="comments" value={formData.comments} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//   <label>Upload File (PDF/JPEG) *</label>
//   <input type="file" accept="application/pdf, image/jpeg" onChange={handleFileChange} />
// </div>


//         <button type="submit" className="submit-btn">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Contact;







import { useState } from "react";
import '../pagesCSS/Contact.css';


const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    gender: "",
    profession: "",
    state: "",
    city: "",
    queryType: "",
    comments: "",
    file: null,
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg"];
      
      if (!allowedTypes.includes(file.type)) {
        setError("Only PDF and JPEG files are allowed.");
        return;
      }
  
      setFormData({ ...formData, file });
      setError("");
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.contactNumber || !formData.comments) {
      setError("All required fields must be filled!");
      return;
    }

    if (!formData.file) {
      setError("Please upload a PDF file.");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("firstName", formData.firstName);
    formDataToSubmit.append("lastName", formData.lastName);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("contactNumber", formData.contactNumber);
    formDataToSubmit.append("gender", formData.gender);
    formDataToSubmit.append("profession", formData.profession);
    formDataToSubmit.append("state", formData.state);
    formDataToSubmit.append("city", formData.city);
    formDataToSubmit.append("queryType", formData.queryType);
    formDataToSubmit.append("comments", formData.comments);
    formDataToSubmit.append("file", formData.file);

    try {
      const response = await fetch("https://virtual-backend-4.onrender.com/contact", {
        method: "POST",
        body: formDataToSubmit,
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        console.log("Submitted Data:", formData);
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("There was an issue submitting the form. Please try again later.");
    }
  };

  return (
   
    <div className="contact-form-container">
     
      <h2>Contact Us</h2>
      
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Form fields here */}
        <div className="form-group">
          <label>First Name *</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name *</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        {/* Other form fields */}
        <div className="form-group">
          <label>Email ID *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Contact Number *</label>
          <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
    
            </select>
          </div>

          <div className="form-group">
            <label>Profession</label>
            <select name="profession" value={formData.profession} onChange={handleChange}>
              <option value="">Select Profession</option>
              <option value="Student">Student</option>
              <option value="Businessman">Businessman</option>
              <option value="Incubator">Incubator</option>
              <option value="Accelerator">Accelerator</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>State</label>
            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
  <option value="Assam">Assam</option>
  <option value="Bihar">Bihar</option>
  <option value="Chhattisgarh">Chhattisgarh</option>
  <option value="Goa">Goa</option>
  <option value="Gujarat">Gujarat</option>
  <option value="Haryana">Haryana</option>
  <option value="Himachal Pradesh">Himachal Pradesh</option>
  <option value="Jharkhand">Jharkhand</option>
  <option value="Karnataka">Karnataka</option>
  <option value="Kerala">Kerala</option>
  <option value="Madhya Pradesh">Madhya Pradesh</option>
  <option value="Maharashtra">Maharashtra</option>
  <option value="Manipur">Manipur</option>
  <option value="Meghalaya">Meghalaya</option>
  <option value="Mizoram">Mizoram</option>
  <option value="Nagaland">Nagaland</option>
  <option value="Odisha">Odisha</option>
  <option value="Punjab">Punjab</option>
  <option value="Rajasthan">Rajasthan</option>
  <option value="Sikkim">Sikkim</option>
  <option value="Tamil Nadu">Tamil Nadu</option>
  <option value="Telangana">Telangana</option>
  <option value="Tripura">Tripura</option>
  <option value="Uttar Pradesh">Uttar Pradesh</option>
  <option value="Uttarakhand">Uttarakhand</option>
  <option value="West Bengal">West Bengal</option>

            </select>
          </div>

          <div className="form-group">
            <label>City</label>
            <select name="city" value={formData.city} onChange={handleChange}>
              <option value="">Select City</option>
              


  {/* Andhra Pradesh */}
  <option value="Visakhapatnam">Visakhapatnam</option>
  <option value="Vijayawada">Vijayawada</option>
  <option value="Tirupati">Tirupati</option>
  <option value="Guntur">Guntur</option>

  {/* Arunachal Pradesh */}
  <option value="Itanagar">Itanagar</option>
  
  {/* Assam */}
  <option value="Guwahati">Guwahati</option>
  <option value="Dibrugarh">Dibrugarh</option>

  {/* Bihar */}
  <option value="Patna">Patna</option>
  <option value="Gaya">Gaya</option>

  {/* Chhattisgarh */}
  <option value="Raipur">Raipur</option>
  <option value="Bhilai">Bhilai</option>

  {/* Goa */}
  <option value="Panaji">Panaji</option>
  <option value="Margao">Margao</option>

  {/* Gujarat */}
  <option value="Ahmedabad">Ahmedabad</option>
  <option value="Surat">Surat</option>
  <option value="Vadodara">Vadodara</option>
  <option value="Rajkot">Rajkot</option>

  {/* Haryana */}
  <option value="Gurugram">Gurugram</option>
  <option value="Faridabad">Faridabad</option>

  {/* Himachal Pradesh */}
  <option value="Shimla">Shimla</option>
  <option value="Manali">Manali</option>

  {/* Jharkhand */}
  <option value="Ranchi">Ranchi</option>
  <option value="Jamshedpur">Jamshedpur</option>

  {/* Karnataka */}
  <option value="Bangalore">Bangalore</option>
  <option value="Mysore">Mysore</option>
  <option value="Mangalore">Mangalore</option>
  <option value="Hubli">Hubli</option>

  {/* Kerala */}
  <option value="Thiruvananthapuram">Thiruvananthapuram</option>
  <option value="Kochi">Kochi</option>
  <option value="Kozhikode">Kozhikode</option>

  {/* Madhya Pradesh */}
  <option value="Bhopal">Bhopal</option>
  <option value="Indore">Indore</option>
  <option value="Gwalior">Gwalior</option>
  <option value="Jabalpur">Jabalpur</option>

  {/* Maharashtra */}
  <option value="Mumbai">Mumbai</option>
  <option value="Pune">Pune</option>
  <option value="Nagpur">Nagpur</option>
  <option value="Nashik">Nashik</option>
  <option value="Aurangabad">Aurangabad</option>

  {/* Manipur */}
  <option value="Imphal">Imphal</option>

  {/* Meghalaya */}
  <option value="Shillong">Shillong</option>

  {/* Mizoram */}
  <option value="Aizawl">Aizawl</option>

  {/* Nagaland */}
  <option value="Kohima">Kohima</option>

  {/* Odisha */}
  <option value="Bhubaneswar">Bhubaneswar</option>
  <option value="Cuttack">Cuttack</option>

  {/* Punjab */}
  <option value="Chandigarh">Chandigarh</option>
  <option value="Ludhiana">Ludhiana</option>
  <option value="Amritsar">Amritsar</option>

  {/* Rajasthan */}
  <option value="Jaipur">Jaipur</option>
  <option value="Jodhpur">Jodhpur</option>
  <option value="Udaipur">Udaipur</option>
  <option value="Kota">Kota</option>

  {/* Sikkim */}
  <option value="Gangtok">Gangtok</option>

  {/* Tamil Nadu */}
  <option value="Chennai">Chennai</option>
  <option value="Coimbatore">Coimbatore</option>
  <option value="Madurai">Madurai</option>
  <option value="Tiruchirapalli">Tiruchirapalli</option>

  {/* Telangana */}
  <option value="Hyderabad">Hyderabad</option>
  <option value="Warangal">Warangal</option>

  {/* Tripura */}
  <option value="Agartala">Agartala</option>

  {/* Uttar Pradesh */}
  <option value="Lucknow">Lucknow</option>
  <option value="Kanpur">Kanpur</option>
  <option value="Agra">Agra</option>
  <option value="Varanasi">Varanasi</option>
  <option value="Allahabad">Allahabad</option>
  <option value="Noida">Noida</option>

  {/* Uttarakhand */}
  <option value="Dehradun">Dehradun</option>
  <option value="Haridwar">Haridwar</option>

  {/* West Bengal */}
  <option value="Kolkata">Kolkata</option>
  <option value="Durgapur">Durgapur</option>
  <option value="Asansol">Asansol</option>

  {/* Union Territories */}
  <option value="New Delhi">New Delhi</option>
  <option value="Pondicherry">Pondicherry</option>
  <option value="Leh">Leh</option>
  <option value="Port Blair">Port Blair</option>


            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Query Type</label>
          <select name="queryType" value={formData.queryType} onChange={handleChange}>
            <option value="">Select Query Type</option>
            <option value="General">General</option>
            <option value="Technical">Technical</option>
            <option value="Technical">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Comments *</label>
          <textarea name="comments" value={formData.comments} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Upload File (PDF/JPEG) *</label>
          <input type="file" accept="application/pdf, image/jpeg" onChange={handleFileChange} />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      


    
    </div>
    

  );
  
};

export default Contact;
