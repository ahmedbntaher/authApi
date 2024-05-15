const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require ('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const userProtoPath = 'user.proto';
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const app = express();
const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
 keepCase: true,
 longs: String,
 enums: String,
 defaults: true,
 oneofs: true,
});
const userProto = grpc.loadPackageDefinition(userProtoDefinition).user;

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
 app.use(
 cors(),
 bodyParser.json(),
 expressMiddleware(server),
 );
});
app.get('/users', (req, res) => {
    const client = new userProto.UserService('localhost:50051',
   grpc.credentials.createInsecure());
    client.searchUser({}, (err, response) => {
    if (err) {
    res.status(500).send(err);
    } else {
    res.json(response.users);
    }
    });
   });
   app.get('/users/:id', (req, res) => {
    const client = new userProto.UserService('localhost:50051',
   grpc.credentials.createInsecure());
    const id = req.params.id;
    client.getuser({ userId: id }, (err, response) => {
    if (err) {
    res.status(500).send(err);
    } else {
    res.json(response.users);
    }
    });
   });

const port = 3000;
app.listen(port, () => {
 console.log(`API Gateway en cours d'exécution sur le port ${port}`);
});