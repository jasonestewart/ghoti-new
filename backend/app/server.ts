import { server } from './app';

const port = process.env.GHOTI_PORT || 4000;
server.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

export default server;