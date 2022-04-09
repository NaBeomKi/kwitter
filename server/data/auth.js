let users = [
  {
    id: "1",
    username: "bob",
    password: "$2b$12$/A5N.1rKwR1kcAuIQUgLUe4EfXjoQXv3Id.NnOaSFmkeqobHFTexe", // password: abcd1234
    name: "Bob",
    email: "bob@gmail.com",
    url: "https://images.unsplash.com/photo-1648919065647-5cca0d3aaca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}