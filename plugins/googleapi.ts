'use strict'
import fp from 'fastify-plugin'
// import * as path from 'path'
// import { JWT } from 'google-auth-library'
import { google } from 'googleapis'
// import * as url from 'url';

const calendar = google.calendar('v3')
class GoogleApi {
    constructor(fastify) {
        this.uuid4 = fastify.uuid4
        this.setClients()
        this.signature = `
            <br><br>--<br>
            <b>Job Pair團隊</b><br>
            找對的人，發揮長久價值
        `
    }
}
export default fp(async function (fastify, opts) {
    const googleApi = new GoogleApi(fastify)
    fastify.decorate('googleApi', function () {
        return googleApi
    })
})
