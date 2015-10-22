'use strict';

let analyze = 'g-analyze'

module.exports = (app)=>{
    app.use('google-analytics', analyze);
    return app
}

