// TwoFASetup.jsx or .tsx (if using TypeScript)
import { useEffect, useState } from 'react';
import { generateTOTP, getTOTPAuthUri,verifyTOTP  } from '@epic-web/totp';
import QRCode from 'qrcode';

const TwoFASetup = ({email}) => {
  const [secret, setSecret] = useState('');
  const [uri, setUri] = useState('');
  const [qr, setQr] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [config, setConfig] = useState({});
  const [message, setMessage] = useState('');

  useEffect(()=>{ 
    handleSetup(email)
  }, [])

  // make a dbcall here that confirms the totp and then marks as successful the signup process. Thanks
  const handleSetup = async (email) => {
    const { secret, period, digits, algorithm } = await generateTOTP()
    console.log("Generated TOTP:", secret); // Add this line

    if (!secret) {
        console.error("TOTP secret is undefined");
        return;
    }

    setConfig({
      secret: secret,
      period: period,
      digits: digits,
      algorithm: algorithm
    });

    const totpUri = getTOTPAuthUri({ period, digits, algorithm, secret: secret, accountName: email, issuer: 'MyReactApp'});
    const qr = await QRCode.toDataURL(totpUri);

    setUri(totpUri);
    setQr(qr);
    setMessage('');
    setIsVerified(false);
  };

  const handleVerify = async () => {
    if (!config || !otpInput) return;

    const isValid = await verifyTOTP({otp: otpInput, ...config});

    setIsVerified(isValid);
    setMessage(isValid ? '✅ Code is valid!' : '❌ Invalid code');
  };


  return (
    <div className='w-[100%]'>
      {email}
      {/* {!secret && (
        <button onClick={handleSetup}>Generate Secret & Show QR</button>
      )} */}

      {qr && (
        <div className='mt-4 text-center'>
          <p>Scan this QR code with Google Authenticator:</p>
          <img src={qr} alt="TOTP QR Code" className='w-[100%]' />
          <p><strong>Backup Secret:</strong> {secret}</p>
        </div>
      )}

      {qr && (
        <div className='my-4'>
          <p>Enter the 6-digit code from your app:</p>
          <input
            type="text"
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value)}
            placeholder="123456"
            maxLength={6}
            className="rounded h-[40px] p-2 w-[100%] my-4 border border-1 border-gray-400"
          />
          <button onClick={handleVerify} className='w-[100%] p-3 text-white bg-[#212121] rounded text-xl font-bold'>
            Verify Code
          </button>
        </div>
      )}

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}

      {isVerified && <p style={{ color: 'green' }}>🎉 You’re protected with 2FA!</p>}
    </div>
  );
};

export default TwoFASetup;
