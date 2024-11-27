import express from "express";
import { generateToken, authenticateUser } from "./security/jwt.js";
import path from "path";
import cookie from "cookie-parser";
import authenticate from "./security/authenticate.js";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = authenticate(username, password);
    
    if(!user) {
        console.log("Login or password incorrect");        
    }

    const token = generateToken(user);
    
    res.status(200).send({token});
});

app.get("/admin", (req, res) => {
    const token = req.headers;
    console.log(token);
    
    if(!token) {
        return res.status(401).json({ message: "Il n'y pas de token" });
    }

    const decoded = authenticateUser(token);
    res.sendFile(path.join(__dirname, "public", "admin.html"));    
});

app.listen(PORT, () => {
    console.log("Server is starting in port: ", PORT);    
});