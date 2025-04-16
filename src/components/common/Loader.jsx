// import React from "react";

// const Loader = ({ size = "medium", fullPage = false }) => {
//   const sizeClasses = {
//     small: "h-4 w-4",
//     medium: "h-8 w-8",
//     large: "h-12 w-12",
//   };

//   const spinner = (
//     <div className="flex items-center justify-center">
//       <div
//         className={`${sizeClasses[size]} animate-spin rounded-full border-t-2 border-b-2 border-blue-500`}
//       ></div>
//     </div>
//   );

//   if (fullPage) {
//     return (
//       <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
//         {spinner}
//       </div>
//     );
//   }

//   return spinner;
// };

// export default Loader;

import React from "react";

const DotLoader = ({ fullPage = false }) => {
  const loader = (
    <div className="flex items-center justify-center space-x-2">
      <span className="h-6 w-6 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="h-6 w-6 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="h-6 w-6 bg-red-500 rounded-full animate-bouncp"></span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur z-50">
        {loader}
      </div>
    );
  }

  return loader;
};

export default DotLoader;
