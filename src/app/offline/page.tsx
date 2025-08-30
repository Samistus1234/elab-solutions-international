import { WifiOff, RefreshCw, Home, Phone } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <WifiOff className="h-10 w-10 text-gray-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          You're Currently Offline
        </h1>
        
        <p className="text-gray-600 mb-8">
          Don't worry! You can still view previously loaded content and we'll sync your progress when you're back online.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full flex items-center justify-center border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Go to Homepage
          </Link>
          
          <Link
            href="/contact"
            className="w-full flex items-center justify-center border border-blue-300 hover:border-blue-400 text-blue-600 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <Phone className="h-4 w-4 mr-2" />
            Contact Support
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Available Offline:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Previously viewed pages</li>
            <li>• Draft applications (auto-saved)</li>
            <li>• Downloaded documents</li>
            <li>• Account information</li>
          </ul>
        </div>
        
        <p className="text-xs text-gray-500 mt-6">
          Your data will sync automatically when you're back online
        </p>
      </div>
    </div>
  );
}