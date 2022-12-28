use async_graphql::{Context, Object, Result};
use prisma::PrismaClient;
use services::todo::TodoService;

use crate::types::todo::Todo;

#[derive(Default)]
pub struct TodoQuery;

#[Object]
impl TodoQuery {
    async fn todos(&self, ctx: &Context<'_>) -> Result<Vec<Todo>> {
        let prisma_client: &PrismaClient = ctx.data::<PrismaClient>().unwrap();

        let todos = TodoService::find_all(prisma_client).await?;

        Ok(todos.into_iter().map(|p| p.into()).collect())
    }
}
