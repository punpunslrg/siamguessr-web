import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useUserStore from "../../stores/userStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validator";
import { toast } from "react-toastify";
import FormInput from "../../components/form/FormInput";
import { Link, useNavigate } from "react-router";

function LoginAdmin() {
  const navigate = useNavigate()
  const login = useUserStore((state) => state.login);

  const { handleSubmit, register, formState, reset } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { isSubmitting, errors } = formState;

  const hdlSubmit = async (value) => {
    try {
      const res = await login(value);
      toast.success("Login Successfully!");
      navigate("/admin/dashboard")
    } catch (error) {
      const errMsg = err.response?.data?.error || err.message;
      toast.error(errMsg);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
      <Card className="w-full max-w-sm">
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
                <FormInput register={register} name="password" errors={errors} type="password" />
              </div>
            </div>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default LoginAdmin;
