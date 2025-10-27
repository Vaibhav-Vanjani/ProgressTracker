import { useState } from "react";
import { useTrackerContext } from "../Context/ProgressTrackerContext";

export default function Form() {
  const {
    showSignupForm,
    setShowSignupForm,
    showLoginForm,
    setShowLoginForm,
    signupFormSubmit,
    loginFormSubmit,
  } = useTrackerContext();

 const [formData,setFormData] = useState({});

 function handleInputFormChange(event){
    const {name,value} = event.target;

   
    setFormData(prev=>{
       if(name === 'phoneNumber' && !((Number)(value?.trim()))){
        console.log("wrong phone number");
          return {...prev,[name]:""};
        }
        return {...prev,[name]:value?.trim()};
    })
 }

  const handleClose = () => {
    setShowSignupForm(false);
    setShowLoginForm(false);
  };

  return (
    <>
      {(showSignupForm || showLoginForm) && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50]" onClick={handleClose}></div>

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] sm:w-[400px] p-6 rounded-2xl shadow-2xl z-[60] transition-all">
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
            >
              ✕
            </button>

            {/* Form Title */}
            <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
              {showSignupForm ? "Create Your Account" : "Welcome Back!"}
            </h2>

            {/* Form */}
            <form
              onSubmit={
                showSignupForm ? ((event)=>signupFormSubmit(event,formData)) : ((event)=>loginFormSubmit(event,formData))
              }
              className="flex flex-col gap-4"
            >
              {showSignupForm && (
                <div className="flex gap-2">
                  <input
                    className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    id="fname"
                    onChange={handleInputFormChange}
                    value={formData?.["firstName"]}
                  />
                  <input
                    className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    id="lname"
                    onChange={handleInputFormChange}
                    value={formData?.["lastName"]}
                  />
                 
                </div>
              )}

                {showSignupForm && (<input
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="tel"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    id="phoneNumber"
                    onChange={handleInputFormChange}
                    value={formData?.["phoneNumber"]}
                  />)
                }

              <input
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                placeholder="Email"
                name={showSignupForm ? "email" : "email"}
                id="email"
                onChange={handleInputFormChange}
                value={formData?.[showSignupForm ? "email" : "email"]}
              />

              <input
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                placeholder="Password"
                name={showSignupForm ? "password" : "password"}
                id="password"
                onChange={handleInputFormChange}
                value={formData?.[showSignupForm ? "password" : "password"]}
              />

              <button
                type="submit"
                className="mt-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
              >
                {showSignupForm ? "Sign Up" : "Log In"}
              </button>
            </form>

            {/* Footer link */}
            <div className="text-center mt-4 text-sm text-gray-600">
              {showSignupForm ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setShowSignupForm(false);
                      setShowLoginForm(true);
                    }}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => {
                      setShowLoginForm(false);
                      setShowSignupForm(true);
                    }}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
