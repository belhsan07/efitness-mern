import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'belhsan',
    email: 'belhsan@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'balti',
    email: 'balti@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
