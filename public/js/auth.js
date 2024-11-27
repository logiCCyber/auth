const form = document.querySelector('#form_auth');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#login').value;
    const password = document.querySelector('#pass').value;

    const response = await fetch("/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    try {
        if (response.status === 401) {
            throw new Error("Invalid credentials");
        }

        if (!response.ok) {
            throw new Error("An error occurred");
        } 
    
        const data = await response.json();
        const token = data.token;
    
        localStorage.setItem("token", token);

        window.location.href = "/admin";
        
    } catch (error) {
        console.log(error.message);        
    }
});
