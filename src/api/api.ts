import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
} from "@apollo/client";
import crypto from "crypto-js";
import { SECRET_KEY } from "constants/keys";
const apiURL = process.env.REACT_APP_API_URL;
// Create an HttpLink that points to your GraphQL server
const httpLink = new HttpLink({
    uri: apiURL,
});
// Create an ApolloLink interceptor to handle requests
const requestInterceptor = new ApolloLink((operation, forward) => {
    // Create a hash (SHA-256 in this example)
    const hash = crypto.SHA256(SECRET_KEY+JSON.stringify(operation.variables));
    // Get the hex digest
    const hexDigest = hash.toString(crypto.enc.Hex);
    // Add the X-Digital-Signature header with the hash value
    const storedUser = localStorage.getItem('userData');
    const parsedUserData = JSON.parse(storedUser);
    operation.setContext(() => ({
        headers: {
            "X-Digital-Signature": hexDigest,
            "X-App-Language": "en",
            Authorization: `Bearer ${parsedUserData?.userVerfication?.token}`
        },
    }));
    return forward(operation);
});
// Create the Apollo Client with the interceptor
const client = new ApolloClient({
    link: ApolloLink.from([requestInterceptor, httpLink]),
    cache: new InMemoryCache(),
});
export default client;