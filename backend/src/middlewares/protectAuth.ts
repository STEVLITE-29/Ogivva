// This file contains the Middleware to protect routes by checking for a valid JWT token in cookies

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"; 

// Extend the Request interface to include userId property for typescript
// This allows us to access req.userId in the route handlers after token verification
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

// Middleware to protect routes
export const protectAuth = (req: Request, res: Response, next: NextFunction): void => {
    // Get token from cookies
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
    }
    try {
        // Verify the token using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded) {
            res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
        }
        // Attach user ID to request object for further use in the route
        req.userId = (decoded as { userId: string }).userId;
        next(); // Call next route handler
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}