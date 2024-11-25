// tests/config/db.mock.ts
const mockQuery = jest.fn();

const mockPool = {
  query: mockQuery, // Attach the mock to the query method
};

export default mockPool;
export { mockQuery }; // Export the mock for further use in tests
