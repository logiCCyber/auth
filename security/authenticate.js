
const users = [
    {
        userId: 100,
        role: "admin",
        username: "root",
        password: "123" // В реальном приложении использовать хешированные пароли
    },
    {
        userId: 101,
        role: "client",
        username: "client",
        password: "123" // В реальном приложении использовать хешированные пароли
    }
];

export default function auth(username, password) {
    const user = users.find(user => user.username === username);
    if (user && user.password === password) {
        return user; // В реальном приложении возвращать данные пользователя или JWT токен
    }
    return false; // Неверные учетные данные
}