import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { validateForgotPassword } from "../utils/validations";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState("");

  const validate = () => {
    const err = validateForgotPassword(email, newPassword, confirmPassword);
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      // replace endpoint with your backend route that handles reset
      // await axios.post(
      //   `${BASE_URL}/auth/reset-password`,
      //   { email, newPassword },
      //   { withCredentials: true }
      // );
      // setSuccess("Password updated successfully. You can now log in.");
      // setEmail("");
      // setNewPassword("");
      // setConfirmPassword("");
      // setErrors({});
    } catch (err) {
      setErrors({
        form: err?.response?.data?.message || "Failed to reset password",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-800 rounded-lg border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

      {errors?.form && (
        <div className="mb-3 text-red-400 text-sm">{errors?.form}</div>
      )}
      {success && <div className="mb-3 text-green-400 text-sm">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full input input-bordered bg-gray-900 text-white"
            placeholder="you@example.com"
            disabled={submitting}
          />
          {errors?.email && (
            <p className="text-xs text-red-400 mt-1">{errors?.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full input input-bordered bg-gray-900 text-white"
            placeholder="New password"
            disabled={submitting}
          />
          {errors?.newPassword && (
            <p className="text-xs text-red-400 mt-1">{errors?.newPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full input input-bordered bg-gray-900 text-white"
            placeholder="Confirm password"
            disabled={submitting}
          />
          {errors?.confirmPassword && (
            <p className="text-xs text-red-400 mt-1">
              {errors?.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
