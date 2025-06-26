function generatePassword() {
    const masala_1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const masala_2 = "abcdefghijklmnopqrstuvwxyz";
    const masala_3 = "1234567890";
    const masala_4 = "!@#$%^&*()+>";

    let password = "";
    const fullLength = masala_1.length + masala_2.length + masala_3.length + masala_4.length;
	const mixedMasala = masala_1 + masala_2 + masala_3 + masala_4;

    for (let i = 0; i < 15; i++) {
        const randomChar = mixedMasala[Math.floor(Math.random() * fullLength)];
        password += randomChar;
    }

    return password;
}

export default generatePassword;
