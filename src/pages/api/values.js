export default function handler(req, res) {
  // Generate a random number between 0 and 10
  const value = Math.floor(Math.random() * 30);
  // Return the random value as JSON
  res.status(200).json({ value });
}
