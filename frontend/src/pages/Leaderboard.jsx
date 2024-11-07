import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingBackground from './FloatingBackground';
import Loader from '../components/Loader';
import { UserContext } from '../auth/UserProvider';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Leaderboard = () => { // Receive `user` as a prop or from context
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow relative flex flex-col items-center justify-center text-center min-h-screen">
        <FloatingBackground />
        <h1 className="text-5xl md:text-[100px] md:leading-[6rem] font-bold font-mono text-center text-white">
          Coming Soon!
        </h1>
        <p className="mt-5 text-xl md:text-2xl text-gray-300 max-w-2xl">
          Welcome to the official portal of our society, where innovation meets community. This page will be crafted by our upcoming members and will soon showcase the latest updates, achievements, and much more!
        </p>
        <p className="mt-8 text-lg text-gray-400 italic">
          Stay tuned as our team brings you something amazing!
        </p>
        
        {/* Conditionally render Join Now button if no user is logged in */}
        {!user && (
          <Link to="/join-us" className="mt-10">
            <button className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
              Join Now
            </button>
          </Link>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;
