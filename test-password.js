import { hashPassword, comparePassword} from "./utils/passwordUtils.js";

const testPassword = async () => {
    const password = "password123";

    const hashedPassword = await hashPassword(password);

    console.log("Orginal password:", password);
    console.log("Hashed password:", hashedPassword);

    const isValid = await comparePassword(password, hashedPassword);

    console.log("Password matches:", isValid);

    const isWrongPasswordValid = await comparePassword(
        "wrongPassword",
        hashedPassword
    );

    console.log("Wrong password matches:", isWrongPasswordValid);

};
testPassword();