const { Users } = require("../models");

class UserRepository {
  createUser = async (usersData) => {
    const createdUser = await Users.create({
      email: usersData.email,
      name: usersData.name,
      age: usersData.age,
      gender: usersData.gender,
      password: usersData.password,
    });
    return createdUser;
  };

  findOneUserId = async (user_id) => {
    const findOneUserData = await Users.findOne({
      where: { user_id: user_id },
    });
    return findOneUserData;
  };

  findOneUserEmail = async (email) => {
    const findOneUserData = await Users.findOne({
      where: { email: email },
    });
    return findOneUserData;
  };
}

module.exports = UserRepository;
