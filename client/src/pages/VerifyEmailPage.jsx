import { useEffect, useState, useRef } from 'react'; // <-- 1. Import useRef
import { useParams, Link } from 'react-router-dom';
import authService from '../services/authService';

const VerifyEmailPage = () => {
    const [status, setStatus] = useState('verifying');
    const { token } = useParams();
    const effectRan = useRef(false); // <-- 2. Create the flag

    useEffect(() => {
        // 3. Only run the effect if the flag is false
        if (token && !effectRan.current) {
            const doVerification = async () => {
                try {
                    await authService.verifyEmail(token);
                    setStatus('success');
                } catch (error) {
                    setStatus('error');
                    console.log(error);

                }
            };
            doVerification();
        }

        // 4. Set the flag to true after the first run
        return () => {
            effectRan.current = true;
        };
    }, [token]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
                {status === 'verifying' && (
                    <h1 className="text-2xl font-bold">Verifying your email...</h1>
                )}
                {status === 'success' && (
                    <div>
                        <h1 className="text-2xl font-bold text-purple-600 mb-4">Email Verified Successfully!</h1>
                        <p className="text-gray-700">You can now log in to your account.</p>
                        <Link to="/login" className="inline-block mt-6 px-6 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                            Go to Login
                        </Link>
                    </div>
                )}
                {status === 'error' && (
                    <div>
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h1>
                        <p className="text-gray-700">The verification link is invalid or has expired.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmailPage;