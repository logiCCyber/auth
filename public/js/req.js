const accessToResource = async function () {
    const token = localStorage.getItem("token");

    if (!token) {
        // Если токена нет, перенаправляем на страницу входа
        window.location.href = "/login";
        return; // Завершаем выполнение функции
    }

    try {
        const result = await fetch("/admin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json", // Исправлено
                "Authorization": `Bearer ${token}`
            }
        });

        // Проверяем, успешен ли ответ
        if (!result.ok) {
            if (result.status === 401 || result.status === 403) {
                // Если токен недействителен, перенаправляем на страницу входа
                window.location.href = "/login";
            } else {
                // Обработка других ошибок
                throw new Error(`Error: ${result.status}`);
            }
        }

        const data = await result.json(); // Обрабатываем успешный ответ
        console.log("Access granted:", data);

    } catch (error) {
        // Ловим сетевые ошибки или другие неожиданные проблемы
        console.error("An error occurred:", error.message);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    accessToResource();
});
