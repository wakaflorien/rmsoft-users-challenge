const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validateForm = async (formData, setErrors) => {
    const newErrors = {};
  
    if (!formData.fname || !formData.fname.trim()) {
      newErrors.fname = "Firstname is required";
    } else if (formData.fname.length < 2) {
      newErrors.fname = "Firstname must be at least 2 characters";
    }

    if (!formData.lname || !formData.lname.trim()) {
      newErrors.lname = "Lastname is required";
    } else if (formData.lname.length < 2) {
      newErrors.lname = "Lastname must be at least 2 characters";
    }

    if (!formData.password || !formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 2) {
      newErrors.password = "Password must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } 
    else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  