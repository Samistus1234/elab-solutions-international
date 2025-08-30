'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Zap } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if it's already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a short delay if not dismissed recently
      const lastDismissed = localStorage.getItem('pwa-prompt-dismissed');
      const now = Date.now();
      const oneDayInMs = 24 * 60 * 60 * 1000;
      
      if (!lastDismissed || (now - parseInt(lastDismissed)) > oneDayInMs) {
        setTimeout(() => setShowPrompt(true), 3000);
      }
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      console.log('PWA installed successfully');
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Error during installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  // Don't show if already installed or not supported
  if (isStandalone || (!deferredPrompt && !isIOS)) {
    return null;
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <h3 className="font-bold text-gray-900 mb-2">
              Install eLab Solutions App
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              Get the best experience with our mobile app. Access your applications offline and receive push notifications.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-xs text-gray-600">
                <Zap className="h-4 w-4 text-green-500 mr-2" />
                Faster loading
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Download className="h-4 w-4 text-blue-500 mr-2" />
                Offline access
              </div>
            </div>

            {isIOS ? (
              <div className="space-y-3">
                <div className="text-xs text-gray-600">
                  To install this app on your iPhone:
                </div>
                <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                  <li>Tap the share button in Safari</li>
                  <li>Select "Add to Home Screen"</li>
                  <li>Tap "Add" to confirm</li>
                </ol>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Install App
                </button>
                <button
                  onClick={handleDismiss}
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Maybe Later
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to check PWA installation status
export function usePWAInstallStatus() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsInstalled(standalone);

    // Listen for install prompt availability
    const handleBeforeInstallPrompt = () => {
      setIsInstallable(true);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  return { isInstallable, isInstalled };
}