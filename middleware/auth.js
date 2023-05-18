import jwt from 'jsonwebtoken';

// authentication middleware
const auth = async (req, res, next) => {
    try {
        // get token from request auth header
        const token = req.headers.authorization.split(" ")[1];

        // if token is not present, send error
        if (!token) res.status(401).json({ message: 'Unauthorized.' });

        // verify received token
        let decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData?.id;
        req.userRole = decodedData?.role;

        // pass to next call
        next();

    } catch (error) {
        // send error
        res.status(500).json({ message: error.message });
    }
};

export default auth;