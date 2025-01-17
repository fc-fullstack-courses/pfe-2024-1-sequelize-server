module.exports.createUser = async (req, res, next) => {
  res.status(201).send('User created');
};

module.exports.deleteUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;
  
  res.status(200).send('User deleted');
};

module.exports.updateUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  res.status(200).send('User updated');
};

module.exports.getUsers = async (req, res, next) => {
  res.status(200).send('All Users returned');
};

module.exports.getUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  res.status(200).send('User returned');
};
