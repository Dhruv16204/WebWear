import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

import { loginUser } from "@/store/auth-slice";
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const initialState = {
  email: "",
  password: "",
};

export default function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
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
            <CardTitle className="text-3xl font-bold">Sign in to your account</CardTitle>
            <CardDescription className="mt-2 text-gray-600">
              Welcome back! Please sign in.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <CommonForm
              formControls={loginFormControls}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText="Sign In"
            />
          </CardContent>

          <CardFooter className="bg-white text-center py-4">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}




