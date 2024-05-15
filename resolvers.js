const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Charger les fichiers proto pour les films et les séries TV
const userProtoPath = 'user.proto';
const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
 keepCase: true,
 longs: String,
 enums: String,
 defaults: true,
 oneofs: true,
});
const userProto = grpc.loadPackageDefinition(userProtoDefinition).user;
// Définir les résolveurs pour les requêtes GraphQL
const resolvers = {
 Query: {
 user: (_, { id }) => {
 // Effectuer un appel gRPC au microservice de films
 const client = new userProto.UserService('localhost:50051',
grpc.credentials.createInsecure());
 return new Promise((resolve, reject) => {
 client.getUser({ userId: id }, (err, response) => {
 if (err) {
 reject(err);
 } else {
 resolve(response.user);
 }
 });
 });
 },
 users: () => {
 // Effectuer un appel gRPC au microservice de films
 const client = new userProto.UserService('localhost:50051',
grpc.credentials.createInsecure());
 return new Promise((resolve, reject) => {
 client.searchUsers({}, (err, response) => {
 if (err) {
 reject(err);
 } else {
 resolve(response.users);
 }
 });
 });
 },
},
};
 module.exports = resolvers;