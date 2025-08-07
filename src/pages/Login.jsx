import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useUserStore from "../stores/userStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/validator";
import { toast } from "react-toastify";
import FormInput from "../components/form/FormInput";
import { Link, useNavigate } from "react-router";
import SocialLogins from "../components/SocialLogins";
import { useEffect } from "react";
import Homebg from "../assets/homepagebg-1.jpg";
import Logo from "../assets/Logo7.png";

function Login() {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);
  const token = useUserStore((state) => state.token);

  const { handleSubmit, register, formState, reset } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { isSubmitting, errors } = formState;

  const hdlSubmit = async (value) => {
    try {
      const res = await login(value);

      if (res.success) {
        toast.success("Login Successfully!");

        if (res.isSubscribed) {
          // ถ้ามี Subscription, ไปที่หน้าสำหรับสมาชิก
          navigate("/homepageforsub", { replace: true });
        } else {
          // ถ้าไม่มี Subscription, ไปที่หน้าสำหรับผู้ใช้ฟรี
          navigate("/homepagefree", { replace: true });
        }
      } else {
        toast.error(res.message || "Login failed");
      }
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
      <div className="mb-8 flex flex-col justify-center items-center ">
        <img className="w-70" src={Logo} />

        <div className="text-white flex flex-col justify-center items-center text-shadow-lg text-shadow-black mt-2 text-3xl font-extrabold backdrop-blur-xl p-6  ">
          <p className="text-[66px] ">EXPLORE THAILAND!</p>

          <p>And test how well you really know the Land of Smiles.</p>
        </div>
      </div>
      <Card className="w-full max-w-sm ring-1 ring-purple-600 shadow-[0_0_20px_4px_rgb(106,90,205)]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(hdlSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Email</Label>
                <FormInput register={register} name="email" errors={errors} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <FormInput
                  register={register}
                  name="password"
                  errors={errors}
                  type="password"
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-4">
              <Button type="submit" className="w-full  ">
                Login
              </Button>
              <SocialLogins role="user" pageType="login" />
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button>
              <Button variant="outline" className="w-full">
                Login with Facebook
              </Button> */}
              <Link
                to="/register"
                className="mt-4 text-center text-sm hover:underline cursor-pointer"
              >
                Create an account
              </Link>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default Login;
