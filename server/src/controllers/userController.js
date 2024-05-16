import User from "../models/user.js";

export const createUser = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    try {
        // Create a new user using the User model
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            username,
            password
        });

        console.log('User inserted successfully');
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Route to fetch all users
export const getUsers = async (req, res) => {
    try {
        // Fetch all users using the User model
        const users = await User.findAll();
        
        console.log('Users fetched successfully');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
 
// Route to fetch user by id
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        // console.log('REQUEST!!!!!!!', req.body)
        // Find user by id using the User model
        const user = await User.findByPk(id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // res.status(200).json(user);
        res.status(200).json({id: user.id, ...user.toJSON()})
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
