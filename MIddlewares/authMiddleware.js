import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Authentication middleware
const authMiddleware = (req, res, next) => {
       const token = req.headers.authorization?.split(' ')[1];
    //    spilt bearer or token jo header main Authorization se lia
    //    hota hai bearer token dono ke string se array main convert krta hai
    //    aur [1] index prr token hota hai jo store hota hai token variable main.

       if(!token){
        return res.status(401).json({
            message: "No token provided, authorization denied"
        })
       }

      try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded User: ", decoded);
        next();
        
      } catch (error) {
        res.status(401).json({
            message: "Invalid token, authorization denied"
        });
      }
}

// Role Based Access Controll Middleware
const isAdmin = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({
            message: "Access denied, admin only"
        });
    }
    next();
}


export { authMiddleware , isAdmin };

