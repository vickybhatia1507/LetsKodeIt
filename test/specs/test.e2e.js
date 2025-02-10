const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const SecurePage = require('../pageobjects/secure.page')

const credentials = [
    { username: 'tomsmith', password: 'SuperSecretPassword!' }
    // Add more credential sets as needed
];

describe('My Login application', () => {
    credentials.forEach(({ username, password }) => {
        it(`should login with username: ${username}`, async () => {
            try {
                await LoginPage.open()

                await LoginPage.login(username, password)
                await expect(SecurePage.flashAlert).toBeExisting()
                await expect(SecurePage.flashAlert).toHaveText(
                    expect.stringContaining('You logged into a secure area!'))
            } catch (error) {
                console.error('Login failed:', error)
                throw new Error('Login process encountered an error')
            }
        });
    });
        // Username contains special symbols
        it('should display error message when logging in with username containing special symbols', async () => {
            const specialUsername = 'user!@#';
            const password = 'SuperSecretPassword!';
        
            try {
                await LoginPage.open();
                await LoginPage.login(specialUsername, password);
                await expect(SecurePage.flashAlert).toBeExisting();
                await expect(SecurePage.flashAlert).toHaveText(
                    expect.stringContaining('Your username is invalid!')
                );
            } catch (error) {
                console.error('Special characters test failed:', error);
                throw error;
            } finally {
                await LoginPage.reset(); // Assuming reset method exists
            }
        });
});
