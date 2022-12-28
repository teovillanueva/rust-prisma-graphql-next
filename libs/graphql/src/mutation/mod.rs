pub mod todo;

pub use todo::TodoMutation;

#[derive(async_graphql::MergedObject, Default)]
pub struct Mutation(TodoMutation);
