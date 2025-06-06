// TOTP2FA.jsx or .tsx (if using TypeScript)
import { useState } from 'react';
import { generateTOTP, getTOTPAuthUri,verifyTOTP  } from '@epic-web/totp';
import QRCode from 'qrcode';

const TOTP2FA = () => {
  const [secret, setSecret] = useState('');
  const [uri, setUri] = useState('');
  const [qr, setQr] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [config, setConfig] = useState({});
  const [message, setMessage] = useState('');

  const handleSetup = async () => {
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

    const totpUri = getTOTPAuthUri({ period, digits, algorithm, secret: secret, accountName: 'user@example.com', issuer: 'MyReactApp'});
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
    <div style={{ maxWidth: '400px', margin: '2rem auto', fontFamily: 'Arial' }}>
      <h2>🔐 Google Authenticator 2FA</h2>

      {!secret && (
        <button onClick={handleSetup}>Generate Secret & Show QR</button>
      )}

      {qr && (
        <div style={{ marginTop: '1rem' }}>
          <p>Scan this QR code with Google Authenticator:</p>
          <img src={qr} alt="TOTP QR Code" style={{ width: '200px' }} />
          <p><strong>Backup Secret:</strong> {secret}</p>
        </div>
      )}

      {qr && (
        <div style={{ marginTop: '1rem' }}>
          <p>Enter the 6-digit code from your app:</p>
          <input
            type="text"
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value)}
            placeholder="123456"
            maxLength={6}
            style={{ padding: '0.5rem', width: '100%' }}
          />
          <button onClick={handleVerify} style={{ marginTop: '0.5rem' }}>
            Verify Code
          </button>
        </div>
      )}

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}

      {isVerified && <p style={{ color: 'green' }}>🎉 You’re protected with 2FA!</p>}
    </div>
  );
};

export default TOTP2FA;
