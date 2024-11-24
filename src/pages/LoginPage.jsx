// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";

// export const LoginPage = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     console.log("Data: " + data.data);
//   };
//   return (
//     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
//         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//           <div className="max-w-md mx-auto">
//             <div>
//               <h1 className="text-2xl font-semibold">Login</h1>
//             </div>
//             <div className="divide-y divide-gray-200">
//               <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <div className="relative">
//                     <input
//                       autoComplete="off"
//                       id="email"
//                       type="email"
//                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
//                       placeholder="Email Address"
//                       {...register("email", { required: "Email is required" })}
//                     />
//                     <label
//                       htmlFor="email"
//                       className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                     >
//                       Email Address
//                     </label>
//                     {errors.email && (
//                       <span className="text-red-500 text-sm">
//                         {errors.email.message}
//                       </span>
//                     )}
//                   </div>

//                   <div className="relative mt-4">
//                     <input
//                       autoComplete="off"
//                       id="password"
//                       type="password"
//                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
//                       placeholder="Password"
//                       {...register("password", {
//                         required: "Password is required",
//                       })}
//                     />
//                     <label
//                       htmlFor="password"
//                       className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                     >
//                       Password
//                     </label>
//                     {errors.password && (
//                       <span className="text-red-500 text-sm">
//                         {errors.password.message}
//                       </span>
//                     )}
//                   </div>

//                   <div className="relative mt-6">
//                     <button
//                       type="submit"
//                       className="bg-cyan-500 text-white rounded-md px-6 py-2 w-full focus:outline-none hover:bg-cyan-600"
//                     >
//                       Login
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuthStore from "../store/authStore"; // Import the auth store

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();

  // Redirect if already logged in
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const response = await login(email, password);

    if (response && response.token) {
      navigate("/");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      type="email"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Email Address"
                      {...register("email", { required: "Email is required" })}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="relative mt-4">
                    <input
                      autoComplete="off"
                      id="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                    {errors.password && (
                      <span className="text-red-500 text-sm">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <div className="relative mt-6">
                    <button
                      type="submit"
                      className="bg-cyan-500 text-white rounded-md px-6 py-2 w-full focus:outline-none hover:bg-cyan-600"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
