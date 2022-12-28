pub mod todo;

pub use todo::TodoQuery;

#[derive(async_graphql::MergedObject, Default)]
pub struct Query(TodoQuery);
