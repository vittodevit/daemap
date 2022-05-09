import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `http://localhost:3000/api/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  /*headers: {
    Authorization: `Bearer ${process.env.API_KEY}`
  }*/
});

export function useGetDaes() {
  return useQuery("get-daes", async () => {
    const { getDaeList } = await graphQLClient.request(
    gql`
    query{
        daes 
        {
          id,
          latitude,
          longitude,
          h24
        }
      }
    `);
    return getDaeList;
  });
}

export function useGetDae(daeId) {
  return useQuery(["get-dae", daeId], async () => {
    const { getDae } = await graphQLClient.request(
      gql`
        query getPost($daeId: ID!) {
          dae(_id: $daeId) {
            _id
            content
            description
            title
          }
        }
      `,
      { daeId }
    );
    return getDae;
  });
}