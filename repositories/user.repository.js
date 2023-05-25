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

  findOneUser = async (email) => {
    const findOneUserData = await Users.findOne({
      where: { email: email },
    });
    return findOneUserData;
  };
}

module.exports = UserRepository;
