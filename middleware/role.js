import { ROLES } from "../constants/index.js";

// user role middleware (for admin routes)
export const roleAdmin = async (req, res, next) => {
    try {
        // if no role in request, user is not authorized
        if (!req.userRole) return res.status(401).json({message: 'Unauthorized.'});

        // if user role is not administrator, send error
        if(req.userRole !== ROLES.Admin) return res.status(403).json({message: 'Unauthorized.'});

        // pass to next call
        next();

    } catch (error) {
        // send error
        res.status(403).json({ message: error.message });
    }
};

// user role middleware (for admin routes)
export const roleBusiness = async (req, res, next) => {
    try {
        // if no role in request, user is not authorized
        if (!req.userRole) return res.status(401).json({message: 'Unauthorized.'});

        // if user role is not business, send error
        if(req.userRole !== ROLES.Business) return res.status(403).json({message: 'Unauthorized.'});

        // pass to next call
        next();

    } catch (error) {
        // send error
        res.status(403).json({ message: error.message });
    }
};