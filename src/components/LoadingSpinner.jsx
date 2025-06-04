import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <SpinnerAnimation />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-12">
      <SpinnerAnimation />
    </div>
  );
};

const SpinnerAnimation = () => (
  <motion.div
    className="relative w-16 h-16"
    animate={{ rotate: 360 }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
  >
    <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
    <motion.div
      className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-r-transparent border-b-blue-300 border-l-transparent rounded-full"
      animate={{ rotate: 240 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    ></motion.div>
  </motion.div>
);

export default LoadingSpinner;
