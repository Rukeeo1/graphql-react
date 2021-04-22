const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

module.exports = {
  Query: {
    vehicles: (_, __, { dataSources, user }) => {
      if (!user) throw new Error('You are not authenticated');
      return dataSources.vehicleAPI.getAllVehicles();
    },
    vehicle: (_, { id }, { dataSources, user }) => {
      if (!user) throw new Error('You are not authenticated');
      return dataSources.vehicleAPI.getAllVehicleId({ vehicleId: id });
    },
    searchVehicles: (_, { id }, { dataSources, user }) => {
      if (!user) throw new Error('You are not authenticated');
      return dataSources.vehicleAPI.searchVehiclesById({ vehicleId: id });
    },
  },
  Mutation: {
    login: async (_, { email, password }, { dataSources }) => {
      try {
        const user = await dataSources.userAPI.findUser({ email });
        if (!user) {
          throw new Error('No user with that email');
        }

        const isValid = await bcrypt.compare(password, user[0].password);

        if (!isValid) {
          throw new Error('Incorrect password');
        }

        const token = jsonwebtoken.sign(
          { id: user[0].id, email: user[0].email },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );

        return { ...user[0], token };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    signUp: async (_, { email, name, password }, { dataSources }) => {
      try {
        const user = await dataSources.userAPI.findUser({ email });
        if (user.length) {
          throw new Error('User with this email already exists');
        }

        const newUser = await dataSources.userAPI.addUser({
          email,
          name,
          password: await bcrypt.hash(password, 10),
        });

        const token = jsonwebtoken.sign(
          {
            id: newUser.id,
            email: newUser.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1y',
          }
        );

        return { ...newUser, token };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
