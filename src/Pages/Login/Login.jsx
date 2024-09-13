import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import PasswordResetModal from "../../Components/PasswordResetModal/PasswordResetModal";

const Login = () => {
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // navigation systems
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  // handle register
  const onSubmit = (data) => {
    const { email, password } = data;

    signInUser(email, password).then((result) => {
      if (result.user) {
        navigate(from);
      }
    });
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center t">
            <h1 className="text-xl md:text-4xl font-bold">Login now!</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
              <PasswordResetModal />
            </div>
            <div className="form-control mt-6 p-0">
              <button className="btn btn-neutral">Login</button>
            </div>
            <label className="label">
              New here?{" "}
              <Link to="/register" className="label-text-alt link link-hover">
                Create an account
              </Link>
            </label>
            <SocialLogin />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
