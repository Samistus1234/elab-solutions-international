const CACHE_NAME = 'elab-solutions-v1.0.0';
const OFFLINE_URL = '/offline';

// Resources to cache for offline functionality
const CACHE_URLS = [
  '/',
  '/services',
  '/academy',
  '/get-started',
  '/contact',
  '/offline',
  '/manifest.json',
  // Add critical CSS and JS files
  '/_next/static/css/app/layout.css',
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/main-app.js',
  // Add essential icons
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install event');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching files');
      return cache.addAll(CACHE_URLS);
    }).then(() => {
      console.log('Service Worker: Skip waiting');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate event');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip Chrome extensions and other non-http(s) requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone response for caching
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                // Only cache GET requests for same origin
                if (event.request.url.startsWith(self.location.origin)) {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match(OFFLINE_URL);
            }
            
            // Return cached fallback for other requests
            return caches.match(event.request);
          });
      })
  );
});

// Background sync for application submissions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'application-submit') {
    event.waitUntil(syncApplicationSubmissions());
  }
  
  if (event.tag === 'document-upload') {
    event.waitUntil(syncDocumentUploads());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push event', event);
  
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/',
      timestamp: Date.now()
    },
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/icons/action-view.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/action-dismiss.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('eLab Solutions', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click', event);
  
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper function to sync application submissions
async function syncApplicationSubmissions() {
  console.log('Service Worker: Syncing application submissions');
  
  try {
    // Get pending submissions from IndexedDB
    const pendingSubmissions = await getPendingSubmissions();
    
    for (const submission of pendingSubmissions) {
      try {
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submission.data)
        });

        if (response.ok) {
          await removePendingSubmission(submission.id);
          console.log('Service Worker: Submission synced successfully');
        }
      } catch (error) {
        console.error('Service Worker: Failed to sync submission', error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// Helper function to sync document uploads
async function syncDocumentUploads() {
  console.log('Service Worker: Syncing document uploads');
  
  try {
    const pendingUploads = await getPendingDocuments();
    
    for (const upload of pendingUploads) {
      try {
        const formData = new FormData();
        formData.append('file', upload.file);
        formData.append('applicationId', upload.applicationId);

        const response = await fetch('/api/documents/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          await removePendingDocument(upload.id);
          console.log('Service Worker: Document synced successfully');
        }
      } catch (error) {
        console.error('Service Worker: Failed to sync document', error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Document sync failed', error);
  }
}

// IndexedDB helper functions (simplified)
async function getPendingSubmissions() {
  // Placeholder - implement IndexedDB operations
  return [];
}

async function removePendingSubmission(id) {
  // Placeholder - implement IndexedDB operations
  console.log('Removing pending submission:', id);
}

async function getPendingDocuments() {
  // Placeholder - implement IndexedDB operations
  return [];
}

async function removePendingDocument(id) {
  // Placeholder - implement IndexedDB operations
  console.log('Removing pending document:', id);
}

// Install prompt handling
self.addEventListener('beforeinstallprompt', (event) => {
  console.log('Service Worker: Before install prompt');
  event.preventDefault();
  
  // Store the event for later use
  self.deferredPrompt = event;
  
  // Send message to client about install availability
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'INSTALL_AVAILABLE'
      });
    });
  });
});

console.log('Service Worker: Loaded successfully');