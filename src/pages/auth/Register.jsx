import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext.jsx";
import Logo from "../../components/Logo.jsx";

function Field({ label, error, children }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-navy-900">
        {label}
      </label>

      {children}

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  matric: "",
  department: "",
  faculty: "",
  level: "",
  gender: "",
  username: "",
  password: "",
  confirm: "",
};

export default function Register() {
  const navigate = useNavigate();
  const { register } = useApp();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400";

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const validate = () => {
    const err = {};

    if (form.fullName.trim().length < 3)
      err.fullName = "Full name is required.";

    if (!/^\S+@\S+\.\S+$/.test(form.email))
      err.email = "Enter a valid email.";

    if (form.phone.trim().length < 11)
      err.phone = "Enter a valid phone number.";

    if (!form.matric.trim())
      err.matric = "Matric number is required.";

    if (!form.department.trim())
      err.department = "Department is required.";

    if (!form.faculty.trim())
      err.faculty = "Faculty is required.";

    if (!form.level)
      err.level = "Select your level.";

    if (!form.gender)
      err.gender = "Select your gender.";

    if (form.username.trim().length < 3)
      err.username = "Username is too short.";

    if (form.password.length < 6)
      err.password = "Password must be at least 6 characters.";

    if (form.password !== form.confirm)
      err.confirm = "Passwords do not match.";

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const result = register(form);

    if (!result.ok) {
      setErrors({
        form: result.message,
      });
      return;
    }

    navigate("/dashboard");
  };
  return (
  <div className="min-h-screen bg-mist flex items-center justify-center px-4 py-12">
    <div className="w-full max-w-3xl rounded-3xl bg-white shadow-card p-8 md:p-10">

      <div className="flex justify-center mb-6">
        <Logo />
      </div>

      <h1 className="text-center font-display text-3xl font-semibold text-navy-900">
        Create Your Account
      </h1>

      <p className="text-center text-ink-500 mt-2 mb-8">
        Join the FUTO ICPC / Student Anti-Corruption Vanguard.
      </p>

      {errors.form && (
        <div className="mb-6 rounded-xl bg-red-100 border border-red-300 p-4 text-red-700">
          {errors.form}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 md:grid-cols-2"
      >

        <Field label="Full Name" error={errors.fullName}>
          <input
            className={inputClass}
            value={form.fullName}
            onChange={handleChange("fullName")}
          />
        </Field>

        <Field label="Email Address" error={errors.email}>
          <input
            type="email"
            className={inputClass}
            value={form.email}
            onChange={handleChange("email")}
          />
        </Field>

        <Field label="Phone Number" error={errors.phone}>
          <input
            className={inputClass}
            value={form.phone}
            onChange={handleChange("phone")}
          />
        </Field>

        <Field label="Matric Number" error={errors.matric}>
          <input
            className={inputClass}
            value={form.matric}
            onChange={handleChange("matric")}
          />
        </Field>

        <Field label="Faculty" error={errors.faculty}>
          <input
            className={inputClass}
            value={form.faculty}
            onChange={handleChange("faculty")}
          />
        </Field>

        <Field label="Department" error={errors.department}>
          <input
            className={inputClass}
            value={form.department}
            onChange={handleChange("department")}
          />
        </Field>

        <Field label="Level" error={errors.level}>
          <select
            className={inputClass}
            value={form.level}
            onChange={handleChange("level")}
          >
            <option value="">Select Level</option>
            <option value="100">100 Level</option>
            <option value="200">200 Level</option>
            <option value="300">300 Level</option>
            <option value="400">400 Level</option>
            <option value="500">500 Level</option>
            <option value="Postgraduate">Postgraduate</option>
          </select>
        </Field>

        <Field label="Gender" error={errors.gender}>
          <select
            className={inputClass}
            value={form.gender}
            onChange={handleChange("gender")}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">
              Prefer not to say
            </option>
          </select>
        </Field>

        <Field label="Username" error={errors.username}>
          <input
            className={inputClass}
            value={form.username}
            onChange={handleChange("username")}
          />
        </Field>

        <Field label="Password" error={errors.password}>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={inputClass}
              value={form.password}
              onChange={handleChange("password")}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Field>

        <Field
          label="Confirm Password"
          error={errors.confirm}
        >
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className={inputClass}
              value={form.confirm}
              onChange={handleChange("confirm")}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>
        </Field>

        <button
          type="submit"
          className="md:col-span-2 rounded-xl bg-gold-500 py-4 font-semibold text-navy-900 transition hover:bg-gold-400"
        >
          Create Account
        </button>

      </form>

      <p className="mt-8 text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-gold-600"
        >
          Login
        </Link>
      </p>

    </div>
  </div>
);
}