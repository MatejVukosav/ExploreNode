'use strict'

module.exports = function (user) {
    return {
        username: user.username,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        age: user.age,
        profile_image: user.profile_image
    };
};