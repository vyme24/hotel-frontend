import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userId = params.get('userId');

        if (token) {
            dispatch(setCredentials({ token, user: { _id: userId } }));

            // Redirect to home or profile
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            navigate('/?login_error=oauth_failed');
        }
    }, [navigate, location, dispatch]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#0a0a0a]">
            <div className="text-center animate-fadeIn group">
                <div className="relative mb-8 flex justify-center">
                    <div className="w-24 h-24 bg-red-50 dark:bg-red-500/10 rounded-[2rem] flex items-center justify-center border border-red-100 dark:border-red-900/30 animate-pulse">
                        <ShieldCheck className="w-12 h-12 text-red-600" />
                    </div>
                    <div className="absolute -top-2 -right-2">
                        <Sparkles className="w-6 h-6 text-red-500 animate-bounce" />
                    </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-gray-900 rounded-full border border-gray-100 dark:border-gray-800 mb-6 font-black uppercase text-[10px] tracking-widest text-gray-500">
                    Establishing Secure Protocol
                </div>

                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-2">
                    Identity <span className="text-red-600 italic">Confirmed</span>
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 font-light max-w-xs mx-auto">
                    Welcome back to the sanctuary of excellence. <br />
                    Preparing your elite experience...
                </p>

                <div className="mt-12 flex justify-center gap-1">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-1 h-1 bg-red-600 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OAuthSuccess;
