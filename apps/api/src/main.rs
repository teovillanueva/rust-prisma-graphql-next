use async_graphql::http::GraphiQLSource;
use async_graphql_rocket::{GraphQLQuery, GraphQLRequest, GraphQLResponse};
use graphql::schema::{build_schema, AppSchema};
use rocket::{
    fairing::{Fairing, Info, Kind},
    get,
    http::Header,
    options, post,
    response::content,
    routes, Request, Response, State,
};

pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        println!("Hello");
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new(
            "Access-Control-Allow-Methods",
            "POST, GET, PATCH, OPTIONS",
        ));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

#[get("/")]
fn graphiql() -> content::RawHtml<String> {
    content::RawHtml(GraphiQLSource::build().endpoint("/graphql").finish())
}

#[get("/graphql?<query..>")]
async fn graphql_query(schema: &State<AppSchema>, query: GraphQLQuery) -> GraphQLResponse {
    query.execute(schema.inner()).await
}

#[post("/graphql", data = "<request>", format = "application/json")]
async fn graphql_request(schema: &State<AppSchema>, request: GraphQLRequest) -> GraphQLResponse {
    request.execute(schema.inner()).await
}

#[options("/<_..>")]
fn all_options() {}

#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
    let schema = build_schema().await;

    let _rocket = rocket::build()
        .manage(schema)
        .mount(
            "/",
            routes![graphql_query, graphql_request, graphiql, all_options],
        )
        .attach(CORS)
        .ignite()
        .await?
        .launch()
        .await?;

    Ok(())
}
