use async_graphql::{InputObject, SimpleObject};
use services::todo::{CreateTodoDto, UpdateTodoDto};

#[derive(SimpleObject)]
pub struct DeleteResult {
    pub deleted_id: String,
}

impl Into<DeleteResult> for prisma::todo::Data {
    fn into(self) -> DeleteResult {
        DeleteResult {
            deleted_id: self.id,
        }
    }
}

#[derive(SimpleObject)]
pub struct Todo {
    pub id: String,
    pub title: String,
    pub completed: bool,
}

impl Into<Todo> for prisma::todo::Data {
    fn into(self) -> Todo {
        Todo {
            id: self.id,
            title: self.title,
            completed: self.completed,
        }
    }
}

#[derive(InputObject)]
pub struct CreateTodoInput {
    pub title: String,
}

impl Into<CreateTodoDto> for CreateTodoInput {
    fn into(self) -> CreateTodoDto {
        CreateTodoDto { title: self.title }
    }
}

#[derive(InputObject)]
pub struct UpdateTodoInput {
    pub title: Option<String>,
    pub completed: Option<bool>,
}

impl Into<UpdateTodoDto> for UpdateTodoInput {
    fn into(self) -> UpdateTodoDto {
        UpdateTodoDto {
            title: self.title,
            completed: self.completed,
        }
    }
}
