use async_graphql::{Context, Object, Result};
use prisma::PrismaClient;
use services::todo::TodoService;

use crate::types::todo::{CreateTodoInput, DeleteResult, Todo, UpdateTodoInput};

#[derive(Default)]
pub struct TodoMutation;

#[Object]
impl TodoMutation {
    async fn create_todo(&self, ctx: &Context<'_>, input: CreateTodoInput) -> Result<Todo> {
        let prisma_client: &PrismaClient = ctx.data::<PrismaClient>().unwrap();

        let todo = TodoService::create(prisma_client, input.into()).await?;

        Ok(todo.into())
    }

    async fn update_todo(
        &self,
        ctx: &Context<'_>,
        id: String,
        input: UpdateTodoInput,
    ) -> Result<Option<Todo>> {
        let prisma_client: &PrismaClient = ctx.data::<PrismaClient>().unwrap();

        let result = TodoService::update(prisma_client, id, input.into()).await;

        match result {
            Ok(todo) => Ok(Some(todo.into())),
            Err(..) => Ok(None),
        }
    }

    async fn delete_todo(&self, ctx: &Context<'_>, id: String) -> Result<Option<DeleteResult>> {
        let prisma_client: &PrismaClient = ctx.data::<PrismaClient>().unwrap();

        let result = TodoService::delete_by_id(prisma_client, id).await;

        match result {
            Ok(todo) => Ok(Some(todo.into())),
            Err(..) => Ok(None),
        }
    }
}
