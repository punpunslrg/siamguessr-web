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
import { useNavigate } from "react-router";

function Register() {
  const navigate = useNavigate()
  const { handleSubmit, register, formState, reset } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { isSubmitting, errors } = formState;

  const hdlSubmit = async (value) => {
    try {
      const res = await actionRegister(value);
      toast.success("Register Successfully!");
      reset();
      navigate("/login")
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      toast.error(errMsg);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
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
                <FormInput register={register} name="password" errors={errors} type="password" />
              </div>
              <div className="grid gap-2">
                <Label>Confirm Password</Label>
                <FormInput register={register} name="confirmPassword" errors={errors} type="password" />
              </div>
            </div>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <Button variant="outline" className="w-full">
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full">
            Continue with Facebook
          </Button>
        </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default Register;
