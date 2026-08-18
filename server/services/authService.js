import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { CustomerUser, AdminUser } from '../domain/UserDomain.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'camera_rental_super_secret_jwt_key_2026', {
    expiresIn: '30d',
  });
};

export const registerUser = async ({ name, email, password, role = 'customer' }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists with this email address');
  }

  const user = await User.create({
    name,
    email,
    passwordHash: password,
    role,
  });

  const userDomain = role === 'admin' 
    ? new AdminUser({ id: user._id, name: user.name, email: user.email, createdAt: user.createdAt })
    : new CustomerUser({ id: user._id, name: user.name, email: user.email, createdAt: user.createdAt });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: userDomain.getPermissions(),
    token: generateToken(user._id),
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const userDomain = user.role === 'admin'
      ? new AdminUser({ id: user._id, name: user.name, email: user.email, createdAt: user.createdAt })
      : new CustomerUser({ id: user._id, name: user.name, email: user.email, createdAt: user.createdAt });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: userDomain.getPermissions(),
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};
