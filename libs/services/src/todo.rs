use prisma::{todo, PrismaClient};
use prisma_client_rust::{Direction, QueryError};
use std::vec;

pub struct CreateTodoDto {
    pub title: String,
}

pub struct UpdateTodoDto {
    pub title: Option<String>,
    pub completed: Option<bool>,
}

pub struct TodoService;

impl TodoService {
    pub async fn create(
        prisma_client: &PrismaClient,
        dto: CreateTodoDto,
    ) -> Result<todo::Data, QueryError> {
        let _todo: todo::Data = prisma_client
            .todo()
            .create(dto.title.to_string(), false, vec![])
            .exec()
            .await?;

        Ok(_todo)
    }

    pub async fn update(
        prisma_client: &PrismaClient,
        id: String,
        dto: UpdateTodoDto,
    ) -> Result<todo::Data, QueryError> {
        let mut update: Vec<todo::SetParam> = vec![];

        if dto.title.is_some() {
            update.push(todo::title::set(dto.title.unwrap()))
        }

        if dto.completed.is_some() {
            update.push(todo::completed::set(dto.completed.unwrap()))
        }

        let _todo = prisma_client
            .todo()
            .update(todo::id::equals(id.to_string()), update)
            .exec()
            .await?;

        Ok(_todo)
    }

    pub async fn delete_by_id(
        prisma_client: &PrismaClient,
        id: String,
    ) -> Result<todo::Data, QueryError> {
        let _todo = prisma_client
            .todo()
            .delete(todo::id::equals(id))
            .exec()
            .await?;

        Ok(_todo)
    }

    pub async fn find_all(prisma_client: &PrismaClient) -> Result<Vec<todo::Data>, QueryError> {
        let _todos: Vec<todo::Data> = prisma_client
            .todo()
            .find_many(vec![])
            .order_by(todo::created_at::order(Direction::Desc))
            .exec()
            .await?;

        Ok(_todos)
    }
}
