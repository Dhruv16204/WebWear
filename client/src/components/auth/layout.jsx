// import { Outlet } from "react-router-dom";

// function AuthLayout() {
//   return (
//     <div className="flex min-h-screen w-full">
//       <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
//         <div className="max-w-md space-y-6 text-center text-primary-foreground">
//           <h1 className="text-4xl font-extrabold tracking-tight">
//             Welcome to ECommerce Shopping
//           </h1>
//         </div>
//       </div>
//       <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default AuthLayout;


import { Outlet } from "react-router-dom";
import Lottie from "lottie-react";
import ecommerceOutlook from "@/assets/animation/ecommerceOutlook.json";

function AuthLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Animation Section */}
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight mb-6">
            Welcome to ECommerce Shopping
          </h1>
          <Lottie animationData={ecommerceOutlook} loop={true} className="w-full max-w-sm mx-auto" />
        </div>
      </div>

      {/* Right Outlet Section */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;