const request = require('supertest');
const app = require('../src/index');

describe('Tournament Controller endpoints', () => {
    it ('should generate a new tornament bracket', async () => {
        const res = await request(app)
            .post('/newevent')
            .send({
                "createdBy": "0BrwqwUwbNXVSIBTew7ab4HpOIO2",
                "EventName": "nome",
                "NumberOfParticipants": "4",
                "EventDate": "1-1-2001",
                "Sport": "futedrose",
                "confirmed":"0",
            })
            expect(res.statusCode).toEqual(200)
            expect(Array.isArray(res.body)).toBe(true)
    })
})
