import http from 'k6/http';
import { check, sleep } from 'k6';

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 100 }, // Ramp-up: 100 VUs in 30s
    { duration: '2m', target: 100 }, // Sustained load: 100 VUs for 2 minutes
    { duration: '30s', target: 0 },  // Ramp-down: reduce VUs back to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should complete within 500ms
    http_req_failed: ['rate<0.01'],  // Error rate should be below 1%
  },
};

// Test data
const BASE_URL_LOGIN = 'http://localhost:3000/login';
const BASE_URL_RESERVATION = 'http://localhost:3000/reservation';

const userCredentials = {
  username: 'testuser',
  password: 'password',
  first_name: 'Test',
  last_name: 'User',
  email: 'manager@gmail.com',
};

export default function () {


  // Login
  const loginPayload = { username: userCredentials.email, password: userCredentials.password };
  const loginRes = http.post(BASE_URL_LOGIN, JSON.stringify(loginPayload), {
    headers: { 'Content-Type': 'application/json' },
  });
  const token = loginRes.json('token'); // Extract token from response
  check(loginRes, {
    'login status is 200': (r) => r.status === 200,
  });

  // Make a reservation
  const reservationPayload = {
    mediaId: '1',
    accountId: '1',
    branchId: '1',
  };
  const reservationRes = http.post(BASE_URL_RESERVATION, JSON.stringify(reservationPayload), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Pass token for authorization
    },
  });
  check(reservationRes, {
    'reservation status is 200': (r) => r.status === 200,
  });

  sleep(1); // Simulate user delay between actions
}
