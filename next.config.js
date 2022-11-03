const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  // next.js config
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    apiKey: 'AIzaSyDQEo0aBj6UC-FMeV2FbUkDO71Gg4ljQj4',
 authDomain: 'biddingcars-363616.firebaseapp.com',
 projectId: 'biddingcars-363616',
 storageBucket: 'biddingcars-363616.appspot.com',
 messagingSenderId: '578243658376',
 appId: '1:578243658376:web:6d384f19b163a47b60553d',
 measurementId: 'G-G1PK01GE79',
 addUserEndpoint:'http://localhost:5000/.netlify/functions/servers'
//  addUserEndpoint:'https://biddingcarsserver.netlify.app/.netlify/functions/server'
 }
})