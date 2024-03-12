const jwt=require('jsonwebtoken')
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (userId, role) => {
    const token = jwt.sign({ userId, role }, SECRET_KEY);
    return token;
}


const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        return decodedToken.userId;
    } catch (error) {
        console.error('Error verifying token:', error.message);
        throw new Error('Invalid token');
    }
}


module.exports = {generateToken,getUserIdFromToken}


