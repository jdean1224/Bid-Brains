import { promisify} from 'util'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signup = async (req, res) => {
    const { email, username, password, fullName, streetAddress, streetAddress2, city, state, zipCode, phoneNumber } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user using the User model
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword,
            fullName,
            streetAddress,
            streetAddress2,
            city,
            state,
            zipCode,
            phoneNumber
        });

        res.status(200).json({ message: 'User created successfully', id: newUser.id });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            console.log('Wrong password!');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, 'my_super_secret_key', { expiresIn: '1h' });

        // Set token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour in milliseconds
            // secure: true,
        });
        res.status(200).json({ message: 'User logged in successfully', id: user.id });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const protect = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return next(console.error("You are not logged in. Please log in to gain access.", 401))
    }
    const decoded = await promisify(jwt.verify)(token, 'my_super_secret_key')

    const freshUser = User.findByPk(decoded.id)
    if (!freshUser) {
        return next(console.error('The user no longer exists.', 401))
    }
    req.user = freshUser
    next()
}

export const logout = async (req, res) => {
    res.clearCookie('token')

    res.status(200).json({message: 'User logged out successfully'})
}

// CREATE TABLE users(
// 	id INT AUTO_INCREMENT PRIMARY KEY,
// 	firstName VARCHAR(252) NOT NULL,
// 	lastNAME VARCHAR(252) NOT NULL,
// 	email VARCHAR(252) NOT NULL,
// 	username VARCHAR(252) NOT NULL,
// 	password VARCHAR(252) NOT NULL
// );
