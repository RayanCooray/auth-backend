import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(' ')[1]; // Remove 'Bearer' prefix
    if (!token) return res.status(401).json({ message: "Invalid token format" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the same secret key
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {  // Check for 'admin' role
        next();
    } else {
        return res.status(403).json({ message: "Unauthorized access" });
    }
};

