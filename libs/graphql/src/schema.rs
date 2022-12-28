use async_graphql::{EmptySubscription, Schema};

use crate::{mutation::Mutation, query::Query};

pub type AppSchema = Schema<Query, Mutation, EmptySubscription>;

pub async fn build_schema() -> AppSchema {
    let prisma_client: prisma::PrismaClient = prisma::new_client()
        .await
        .expect("Failed to create Prisma client");

    Schema::build(Query::default(), Mutation::default(), EmptySubscription)
        .data(prisma_client)
        .finish()
}
