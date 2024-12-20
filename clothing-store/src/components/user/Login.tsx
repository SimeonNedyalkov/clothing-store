import { Checkbox, Field, Label } from "@headlessui/react";
import { useState } from "react";
import googleIco from "../../assets/signupwith/google-logo-search-new-svgrepo-com.svg";
import facebookIco from "../../assets/signupwith/facebook-1-svgrepo-com.svg";
import instagramIco from "../../assets/signupwith/instagram-svgrepo-com.svg";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
const initialValues = { email: "", password: "" };
export default function Login() {
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigate();
  const { values, submitHandler, changeHandler } = useForm(
    initialValues,
    async () => {
      const { email, password } = values;
      try {
        await console.log(email);
        await console.log(password);
      } catch (error) {
        setError("Warning incorrect username or password");
      }
    }
  );
  return (
    <>
      <div className="loginForm">
        <div className="formWrapper">
          <form className="flex flex-col" onSubmit={submitHandler}>
            <h1 className="text-4xl text-sky-950 pb-5">
              Login to your account.
            </h1>
            <h5 className="text-sm text-gray-600 pb-5">
              Hello, welcome back to your account
            </h5>

            <div className="mb-3 flex flex-col">
              <label className="flex justify-start styledEmail">E-mail</label>
              <input
                type="email"
                className="form-control styledInput"
                placeholder="example@email.com"
                onChange={changeHandler}
                name="email"
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label className="flex justify-start styledPassword">
                Password
              </label>
              <input
                type="password"
                className="form-control styledInput"
                placeholder="Your Password"
                onChange={changeHandler}
                name="password"
              />
            </div>

            <div className="mb-3 mt-3 flex flex-row items-center justify-between">
              <Field className="flex items-center gap-2">
                <Checkbox
                  checked={enabled}
                  onChange={setEnabled}
                  className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                >
                  <svg
                    className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Checkbox>
                <Label>Remember me</Label>
              </Field>
              <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
              </p>
            </div>

            <div className="d-grid flex justify-center">
              <button type="submit" className="loginBtn">
                Login
              </button>
            </div>
            <div className="divider">
              <hr className="line" />
              <span className="lineText">or sign up with</span>
              <hr className="line" />
            </div>
            <div className="flex flex-row justify-between">
              <img src={facebookIco} alt="" width={40} height={40} />
              <img src={googleIco} alt="" width={40} height={40} />
              <img src={instagramIco} alt="" width={40} height={40} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}