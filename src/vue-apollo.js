import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'cross-fetch'

// Install the vue plugin
Vue.use(VueApollo)


// Http endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:8000/graphql'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  fetch,
  headers:{
    'Content-type' : 'application/json'
  },
  uri: httpEndpoint,
})

// Cache implementation
const cache = new InMemoryCache()

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: defaultOptions,
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})