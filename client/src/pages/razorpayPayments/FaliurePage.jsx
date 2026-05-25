import React, { useEffect } from 'react';
import { XCircle } from 'lucide-react';
import { trackFacebookEvent } from '../../utils/';

const FailurePage = () => {
    const handleRetry = () => {
        window.history.back();
    };

    const handleGoHome = () => {
        window.location.href = '/';
    };

    useEffect(() => {
        const FIRED_KEY = "exc_drop_fired";
        if (sessionStorage.getItem(FIRED_KEY)) return;

        sessionStorage.setItem(FIRED_KEY, "true");
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
                <XCircle className="text-red-500 mx-auto mb-6" size={64} />
                
                <h1 className="text-3xl font-bold mb-3 text-red-600">Payment Failed!</h1>
                
                <p className="text-gray-600 mb-8">
                    We're sorry, but your payment could not be processed. Please try again or contact support if the problem persists.
                </p>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Need help? <a href="/contact" className="text-red-500 hover:text-red-600 font-semibold">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FailurePage;