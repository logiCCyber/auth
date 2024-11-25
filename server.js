import express from "express";
import { generateToken, authenticateUser } from "./security/jwt.js";
import path from "path";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const auth = [
    {
        admin: {
            userId: 100,
            role: "admin",
            username: "root",
            password: "123"
        },
    },
    {
        client: {
            userId: 101,
            role: "client",
            username: "client",
            password: "123"
        },
    }
];

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/admin", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Извлекаем токен из заголовка
    console.log("Полученный токен:", token);

    if (!token) {
        // Перенаправляем пользователя на "/"
        return res.redirect("/");
    }

    const isAuthenticated = authenticateUser(token);
    console.log(isAuthenticated);
    

    if (!isAuthenticated) {
        // Перенаправляем пользователя на страницу авторизации
        return res.redirect("/");
    } else {
        // Если всё успешно, отправляем файл
        res.sendFile(path.join(__dirname, "public", "admin.html"));
    }

});



app.post("/", (req, res) => {
    const { username, password } = req.body;
    try {
        if(username === auth[0].admin.username && password === auth[0].admin.password) {        
            const token = generateToken(auth[0].admin.userId);
            res.status(200).send({token: token, role: auth[0].admin.role});
        } else if(username === auth[1].client.username && password === auth[1].client.password) {
            const token = generateToken(auth[1].client.userId);
            res.status(200).send({token: token, role: auth[1].client.role});
        } else {
            res.status(400).send({error: "incorrect login or password"});
        }
    } catch(err) {
        res.status(501).send("Serve isn't work");
    }    
});

app.listen(PORT, () => {
    console.log("Server is starting in port: ", PORT);    
});