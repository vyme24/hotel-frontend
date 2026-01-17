import { useEffect } from "react";
import { useLoginMutation } from "../../services/authService";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({
    user : "",
    password: ""
  })
  const [loginAccount, {isLoading, isError, data, isSuccess} ] = useLoginMutation();

  useEffect(() => {

    if(isSuccess && data){
    
      toast.success(data.message);
      localStorage.setItem("token", data.token)
      window.location.href="/"

    }

  },[isError,isLoading,isSuccess,data])

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission logic here
      try {
         if(form.user === "" && form.password === ""){
          throw new Error("Required fields are empty!")
       }
      const res = await loginAccount(form).unwrap()
      console.log(res)
        
      } catch (error) {
        console.log(error.message)
        
      }
    };

  return (
    <div className="modal-content">
          <div className="modal-header mb-3 text-center d-block">
            <div>
              <h5 className="modal-title title" id="exampleModalLongTitle2">
                Login
              </h5>
              <p className="font-size-14">Hello! Welcome to your account</p>
            </div>
           
          </div>
          <div className="modal-body">
            <div className="contact-form-action">
              <form method="post" onSubmit={handleSubmit}>
                <div className="input-box">
                  <label className="label-text">Username</label>
                  <div className="form-group">
                    <span className="la la-user form-icon" />
                    <input
                      className="form-control"
                      type="text"
                      name="text"
                      defaultValue={form.user}
                      placeholder="Type your username"
                      onKeyUp={(e)=> setForm({...form, user: e.target.value})}
                    />
                  </div>
                </div>
                {/* end input-box */}
                <div className="input-box">
                  <label className="label-text">Password</label>
                  <div className="form-group mb-2">
                    <span className="la la-lock form-icon" />
                    <input
                      className="form-control"
                      type="text"
                      name="text"
                      defaultValue={form.password}
                      placeholder="Type your password"
                        onKeyUp={(e)=> setForm({...form, password: e.target.value})}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="custom-checkbox mb-0">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberchb"
                      />
                      <label htmlFor="rememberchb">Remember me</label>
                    </div>
                    <p className="forgot-password">
                      <a href="recover.html">Forgot Password?</a>
                    </p>
                  </div>
                </div>
                {/* end input-box */}
                <div className="btn-box pt-3 pb-4">
                  <button type="submit" className="theme-btn w-100">
                    Login Account
                  </button>
                </div>
              
              </form>
            </div>
            {/* end contact-form-action */}
          </div>
        </div>
  )
}

export default Login