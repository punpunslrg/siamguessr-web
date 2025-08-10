import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/validator";
import { actionRegister } from "../api/authApi";
import { toast } from "react-toastify";
import FormInput from "../components/form/FormInput";
import { Link, useNavigate } from "react-router";
import SocialLogins from "../components/SocialLogins";
import { useEffect } from "react";
import useUserStore from "../stores/userStore";
import Homebg from "../assets/homepagebg-1.jpg";
import Logo from "../assets/Logo7.png";

function Register() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const { handleSubmit, register, formState, reset } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { isSubmitting, errors } = formState;

  const hdlSubmit = async (value) => {
    try {
      const res = await actionRegister(value);
      toast.success("Register Successfully!");
      reset();
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      toast.error(errMsg);
    }
  };

  useEffect(() => {
    // ถ้ามี token อยู่แล้ว ให้ redirect ไปหน้าหลัก
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-[calc(100vh-64px)] bg-cover bg-bottom"
      style={{ backgroundImage: `url(${Homebg})` }}
    >
      <div className="-mt-10 mb-8 flex flex-col justify-center items-center ">
        <img className="w-100" src={Logo} />
      </div>
      <Card className="w-full max-w-sm ring-1 ring-purple-600 shadow-[0_0_20px_4px_rgb(106,90,205)]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Create an account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(hdlSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Email</Label>
                <FormInput register={register} name="email" errors={errors} />
              </div>
              <div className="grid gap-2">
                <Label>Name</Label>
                <FormInput
                  register={register}
                  name="username"
                  errors={errors}
                />
              </div>
              <div className="grid gap-2">
                <Label>Password</Label>
                <FormInput
                  register={register}
                  name="password"
                  errors={errors}
                  type="password"
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm Password</Label>
                <FormInput
                  register={register}
                  name="confirmPassword"
                  errors={errors}
                  type="password"
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-4">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <SocialLogins role="user" pageType="register" />
              <Link
                to="/"
                className="text-center text-sm hover:underline cursor-pointer text-gray-400"
              >
                Back to Homepage
              </Link>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default Register;
