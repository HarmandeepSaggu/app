// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle, CheckCircle } from "lucide-react";
//
// export default function LoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [focusedField, setFocusedField] = useState("");

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
    
//     try {
//       const res = await fetch(" http://localhost:4000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (!res.ok) return setError(data.message);
      
//       localStorage.setItem("username", data.username);
//       router.push("/chat");
//     } catch (err) {
//       setError("Login failed. Please check your network or server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegisterRedirect = () => {
//     router.push("/register");
//   };

//   const handleForgotPassword = () => {
//     // Add your forgot password logic here
//     router.push("/forgot-password");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
//             <LogIn className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//           <p className="text-gray-600">Sign in to your account</p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700 block">Email Address</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className={`w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-indigo-600' : 'text-gray-400'}`} />
//                 </div>
//                 <input
//                   name="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   value={form.email}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedField('email')}
//                   onBlur={() => setFocusedField('')}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700 block">Password</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className={`w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-indigo-600' : 'text-gray-400'}`} />
//                 </div>
//                 <input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={form.password}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedField('password')}
//                   onBlur={() => setFocusedField('')}
//                   className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Forgot Password Link */}
//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={handleForgotPassword}
//                 className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
//               >
//                 Forgot your password?
//               </button>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-xl">
//                 <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
//                 <p className="text-red-700 text-sm">{error}</p>
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center space-x-2">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   <span>Signing in...</span>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center space-x-2">
//                   <LogIn className="w-5 h-5" />
//                   <span>Sign In</span>
//                 </div>
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="mt-6 flex items-center">
//             <div className="flex-1 border-t border-gray-300"></div>
//             <div className="px-4 text-sm text-gray-500 bg-white">or</div>
//             <div className="flex-1 border-t border-gray-300"></div>
//           </div>

         
//           {/* Footer */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600 text-sm">
//               Don't have an account?{" "}
//               <button 
//                 onClick={handleRegisterRedirect}
//                 className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
//               >
//                 Create account
//               </button>
//             </p>
//           </div>
//         </div>

//         {/* Trust Indicators */}
//         <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-500">
//           <div className="flex items-center space-x-1">
//             <CheckCircle className="w-4 h-4 text-green-500" />
//             <span>Secure Login</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <CheckCircle className="w-4 h-4 text-green-500" />
//             <span>Protected</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <CheckCircle className="w-4 h-4 text-green-500" />
//             <span>Trusted</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://app-backend-1naq.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // IMPORTANT: include cookies
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      // Store non-sensitive data only
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      console.log("Login successful. Redirecting to /chat");
      router.push("/chat");
    } catch (err) {
      setError("Login failed. Please check your network or server.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 transition-colors ${focusedField === "email" ? "text-indigo-600" : "text-gray-400"}`} />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 transition-colors ${focusedField === "password" ? "text-indigo-600" : "text-gray-400"}`} />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                Forgot your password?
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-4 text-sm text-gray-500 bg-white">or</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <button
                onClick={handleRegisterRedirect}
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                Create account
              </button>
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Secure Login</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Protected</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Trusted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
