const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');


const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => (root, args, context, info) => {
            return context.db.query.links({}, info)
        },
        link (obj, args) {
            return links.find((link) =>  link.id === args.id );
        },
    },
    Mutation: {
        post: (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                  url: args.url,
                  description: args.description,
                },
            }, info)
        },
    },

};

// 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/public-mangovole-825/hackernews-node/dev',
            secret: 'mysecret123',
            debug: true,
        }),
    }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))