const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link (obj, args) {
            return links.find((link) =>  link.id === args.id );
        },
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            };
            links.push(link)
            return link
        },
        updateLink: function (root, args ) {
            console.log("ROOT", root, "ARGS", args)

            if (!links[args.id]) {
                throw new Error('no message exists with id ' + id);
            }
            // This replaces all old data, but some apps might want partial update.
            return new Message(id, input);
        },
    },

};

// 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))