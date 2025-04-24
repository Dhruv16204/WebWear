import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

import { registerUser } from "@/store/auth-slice";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🛡️ Real-time form validity (all fields filled + passwords match)
  useEffect(() => {
    const { username, email, password, confirmPassword } = formData;
    setIsFormValid(
      username.trim() !== "" &&
        email.trim() !== "" &&
        password.trim() !== "" &&
        password === confirmPassword
    );
  }, [formData]);

  function onSubmit(event) {
    event.preventDefault();
    // Final check—shouldn't fire if button is disabled
    if (!isFormValid) return;
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
        navigate("/auth/login");
      } else {
        toast.error(data.payload.message);
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="bg-white text-center p-6">
            <CardTitle className="text-3xl font-bold">Create New Account</CardTitle>
            <CardDescription className="mt-2 text-gray-600">
              Join us and start exploring!
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <CommonForm
              formControls={registerFormControls}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText="Sign Up"
              isBtnDisabled={!isFormValid}
            />

            {/* Real-time password match feedback */}
            {formData.confirmPassword.length > 0 && (
              <p
                className={`mt-2 text-sm ${
                  formData.password === formData.confirmPassword
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formData.password === formData.confirmPassword
                  ? "Passwords match ✔️"
                  : "Passwords do not match"}
              </p>
            )}
          </CardContent>

          <CardFooter className="bg-white text-center py-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
