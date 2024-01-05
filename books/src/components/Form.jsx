import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { formData, updateSavedData } from "../utils/redux/action";
import { Link } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();

  const submittedData = useSelector((e) => {
    return e.formData;
  });
  
 let savedData = JSON.parse(localStorage.getItem("data"))
  console.log("savedData: ", savedData);
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm();
  console.log("errors: ", errors);

  console.log(watch());
  const formSubmitHandler = (data) => {
    toast.success("Form Submitted", {
      theme: "dark",
    });
    localStorage.setItem("data", JSON.stringify(data));
    console.log("data: ", data);
    dispatch(formData(data));
    dispatch(updateSavedData(data))
    reset()
  };
  const password = watch("password");
  const handleReset = ()=>{
    dispatch(formData({}))
    localStorage.clear()
    dispatch(updateSavedData(null))
  }
  return (
    <div id="container">
      {savedData != null ? (
              <div id="registered">
              <div id="registered-box">
                <div id="reg-text">You Are Registered!</div>
                <div id="buttons">
                  <Link to={"/"}>
                  <button id="back-to-home">Back to Home</button>
                  </Link>
                <button id="reset" onClick={handleReset}>Reset</button>
                </div>
              </div>
            </div>
      ) : (
        <div className="form-container">
          <fieldset>
            <legend>Fill This Form</legend>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
              <ToastContainer />

              <label>Name:</label>
              <input
                type="text"
                name="firstName"
                {...register("firstName", {
                  required: "Please enter your First Name",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 char required",
                  },
                  maxLength: {
                    value: 30,
                    message: "Maximum 30 char required",
                  },
                })}
              />
              <p className="err">{errors.firstName?.message}</p>

              <label>Email:</label>
              <input
                type="email"
                name="email"
                {...register("email", { required: "Please enter your email" })}
              />
              <p className="err">{errors.email?.message}</p>

              <label>Password:</label>
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 char required",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password Not Valid",
                  },
                })}
              />
              <p className="err">{errors.password?.message}</p>

              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirm_password"
                {...register("confirm_password", {
                  required: "Please enter your password",
                  validate: (value) =>
                    value == password || "Password do not match",
                })}
              />
              <p className="err">{errors.confirm_password?.message}</p>

              <input type="submit" value={"Sign up"} />

              {/* <button className='reset' onClick={()=>{
reset()
}}> Reset</button> */}
            </form>
          </fieldset>
        </div>
      )}
    </div>
  );
};

export default Form;



// Object.keys(submittedData).length != 0