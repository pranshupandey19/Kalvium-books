import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { formData, updateSavedData } from "../utils/redux/action";
import { Link } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();

  // Get submitted form data from Redux state
  const submittedData = useSelector((e) => {
    return e.formData;
  });

  // Retrieve saved data from local storage
  let savedData = JSON.parse(localStorage.getItem("data"));
  console.log("savedData: ", savedData);

  // React Hook Form usage
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm();
  console.log("errors: ", errors);
  console.log(watch());

  // Form submission handler
  const formSubmitHandler = (data) => {
    toast.success("Form Submitted", {
      theme: "dark",
    });
    localStorage.setItem("data", JSON.stringify(data));
    console.log("data: ", data);
    dispatch(formData(data));
    dispatch(updateSavedData(data));
    reset();
  };

  // Watching for password changes
  const password = watch("password");

  // Function to handle form reset
  const handleReset = () => {
    dispatch(formData({})); // Clear the form data in Redux state
    localStorage.clear(); // Clear localStorage
    dispatch(updateSavedData(null)); // Update Redux state for saved data
  };

  return (
    <div id="container">
      {/* Conditional rendering based on savedData */}
      {savedData != null ? (
        <div id="registered">
          <div id="registered-box">
            <div id="reg-text">You Are Registered!</div>
            <div id="buttons">
              {/* Link to navigate back to Home */}
              <Link to={"/"}>
                <button id="back-to-home">Back to Home</button>
              </Link>
              <button id="reset" onClick={handleReset}>
                Reset
              </button>
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
            </form>
          </fieldset>
        </div>
      )}
    </div>
  );
};

export default Form;
