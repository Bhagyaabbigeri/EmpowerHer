import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const generateToken = (userId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { user: { id: userId } };
    const options = { expiresIn: JWT_EXPIRES_IN };
    
    jwt.sign(
      payload,
      JWT_SECRET,
      options,
      (err, token) => {
        if (err) {
          console.error('Error generating token:', err);
          reject('Error generating token');
        } else if (token) {
          resolve(token);
        } else {
          reject('Token generation failed');
        }
      }
    );
  });
};

export const verifyToken = (token: string): Promise<{ user: { id: string } }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
        reject('Invalid token');
      } else if (decoded && typeof decoded === 'object' && 'user' in decoded) {
        resolve(decoded as { user: { id: string } });
      } else {
        reject('Invalid token payload');
      }
    });
  });
};
