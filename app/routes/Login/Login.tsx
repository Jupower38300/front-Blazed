import { FaPhone, FaEnvelope, FaGoogle, FaApple } from 'react-icons/fa';
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowLeft,
} from 'react-icons/md';
import logoDark from '/logo.png';
import { ArrowLeft } from 'lucide-react';

const methods = [
  { label: 'Téléphone', path: '/login/phone', icon: <FaPhone /> },
  { label: 'Email', path: '/login/email', icon: <FaEnvelope /> },
  { label: 'Google', path: '/api/auth/google', icon: <FaGoogle /> },
  { label: 'Apple', path: '/api/auth/apple', icon: <FaApple /> },
];

export default function Login() {
  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-[#FF9900] via-[#F43429] to-[#22002A] text-white flex flex-col justify-between items-center px-6 py-10">
      <div className="absolute top-25 left-7 w-10 h-10 justify-center flex items-center bg-white rounded-full hover:bg-white/30">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
          className="text-[#22002A] bg-white rounded-full hover:bg-white/30"
        >
          <MdOutlineKeyboardArrowLeft className=" w-10 h-10 ml-[-2px]" />
        </a>
      </div>
      <div className="w-[60%] mt-15">
        <img src={logoDark} alt="Logo" className="w-full" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-end w-full">
        <p className="text-[18px] text-white/90 mb-6">
          Je souhaite me connecter avec ?
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          {methods.map((method) => (
            <a
              key={method.label}
              href={method.path}
              className="relative flex justify-center items-center bg-white text-[#22002A] font-bold py-3 rounded-full hover:bg-gray-100 transition text-center"
            >
              <span className="absolute left-4 text-lg">{method.icon}</span>
              {method.label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
