import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default new ApolloClient({
    // link: new HttpLink({ uri: 'https://fbc-student-api-kble4lljhq-uc.a.run.app/api' }),
    link: new HttpLink({ uri: 'http://localhost:5500/api' }),
    cache: new InMemoryCache(),
});