export const wigzoTrack = (event, data) => {
  if (typeof wigzo === 'undefined') {
    console.warn('Wigzo not loaded');
    return;
  }
  wigzo('track', event, data);
  console.log(`✅ Wigzo event fired: ${event}`, data); // remove in production
};

export const wigzoIdentify = (user) => {
  if (typeof wigzo === 'undefined') {
    console.warn('Wigzo not loaded');
    return;
  }
  wigzo('identify', user);
  console.log('✅ Wigzo identify fired', user); // remove in production
};