const request = require('supertest');

const app = require('../../app');

describe("POST '/api/auth/login'", ()=> {
    beforeAll(() => {
        server = app.listen(3000);
      });
    
      afterAll((done) => {
        server.close(done);
      });

    test('should return a token and user object with status code 200', async()=> {
        const user = {
            email: "test@gmail.com",
            password: "test123"  
        }
        const response = await request(app).post('/api/auth/login').send(user);

        expect(response.statusCode).toBe(200);
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.user).toBeDefined();
        expect(response.body.data.user.email).toBeDefined();
        expect(response.body.data.user.password).toBeDefined();
        expect(typeof response.body.data.user.email).toBe("string");
        expect(typeof response.body.data.user.password).toBe("string");
    })
})