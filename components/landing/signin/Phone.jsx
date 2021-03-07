import { useState, useRef, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';

const OTPDigit = () => (
  <input
    maxLength="1"
    className="w-16 bg-white shadow-lg focus:outline-none focus:border-pri-yellow hover:border-pri-yellow py-2 rounded-lg border text-4xl font-semibold text-center text-pri-blue appearance-none"
  />
);

const Mobile = ({ auth, phone, setPhone, advance, close }) => {
  const [OTP, setOTP] = useState(null);
  const [error, setError] = useState(null);

  const OTPRef = useRef();

  useEffect(()=>{
    auth.user && auth.user.phone && advance();
  }, []);

  const generateOTP = async () => {
    const parsedNumber = phone.substring(phone.indexOf('+') + 1);
    console.log(parsedNumber);

    try {
      const response = await axios.post(
        '/api/proxy?proxyRoute=sendotp',
        {
          token: 'hackers',
          receiver: parsedNumber
        },
        { headers }
      );

      const { otp } = response.data;

      setOTP(otp);
    } catch (err) {
      console.info(err);
    }
  };

  const verifyOTP = () => {
    const refVal = OTPRef.current;
    const collection = refVal.children;

    let userOTP = '';

    for (let idx in collection) {
      if (idx < 4) {
        userOTP += collection[idx].value;
      } else break;
    }

    if (userOTP === OTP) {
      advance();
    } else {
      setError(
        `OTP does not match! Please enter the correct OTP sent to you here: ${phone}`
      );
    }
  };

  return (
    <div className="flex flex-col items-center md:w-80 space-y-4 m-auto p-4">
      <h2 className="text-2xl">VERIFY YOUR ACCOUNT</h2>
      {!!!OTP ? (
        <>
          <p className="text-sm text-pri-gray text-center">
            You’re almost done. Complete sign-up by verifying your phone number.
          </p>
          <div>
            <PhoneInput
              className="bg-white text-black px-2 py-1"
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
            />
            <div className="w-full flex flex-row space-between my-4">
              <button
                onClick={close}
                className="w-1/2 text-pri-blue bg-white px-8 py-1 mr-1 rounded-lg shadow-sm text-lg"
              >
                Cancel
              </button>
              <button
                onClick={generateOTP}
                className="w-1/2 text-white bg-pri-blue px-8 py-1 ml-1 rounded-lg shadow-sm text-lg"
              >
                Submit
              </button>
            </div>
            <p className="text-sm text-pri-gray text-center ">
              By tapping verify, an SMS may be sent. Message & data rates may
              apply.
            </p>
          </div>
        </>
      ) : (
        <div>
          <p className="text-sm text-pri-gray text-center">A 4-digit OTP has been sent to you on your mobile phone number. Please enter it below.</p>
          <div
            ref={OTPRef}
            className="flex space-x-4 items-center justify-between py-8"
          >
            {[0, 1, 2, 3].map((idx) => (
              <OTPDigit key={`otp-${idx}`} />
            ))}
          </div>
          <button
            className="w-full text-white bg-pri-blue px-8 py-3 rounded-lg shadow-sm text-lg"
            onClick={verifyOTP}
          >
            Submit
          </button>
          {error && (
            <p className="text-red-500 text-md mt-2 font-semibold">{error}</p>
          )}
        </div>
      )}
    </div>
  );
};
export default Mobile;
