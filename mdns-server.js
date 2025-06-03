import bonjour from 'bonjour';
import os from 'os';

const instance = bonjour();

// Publish using 'webrtc.local' as the host
instance.publish({
  name: 'webrtc',
  type: 'http',
  port: 80,
  host: 'webrtc.local'
});

console.log('📡 Bonjour service published as webrtc.local:5173');
