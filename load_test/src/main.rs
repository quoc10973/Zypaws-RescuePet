use reqwest::Client;
use tokio::time::{sleep, Duration};
use std::sync::Arc;
use dotenvy::dotenv;
use std::env;

const NUM_REQUESTS: usize = 10000; // total requests will be sent
const CONCURRENT_REQUESTS: usize = 2000; // number of requests sent concurrently

#[tokio::main]
async fn main() {

    // Load environment variables
    dotenv().ok();

    let target_url = env::var("BACKEND_URL").expect("BACKEND_URL is not set in .env");

    let client = Arc::new(Client::new());
    let mut handles = vec![];

    for _ in 0..CONCURRENT_REQUESTS {
        let client = Arc::clone(&client);
        let target_url = target_url.clone(); // Clone URL để dùng trong async

        handles.push(tokio::spawn(async move {
            for _ in 0..(NUM_REQUESTS / CONCURRENT_REQUESTS) {
                match client.get(&target_url).send().await {
                    Ok(response) => println!("Response: {}", response.status()),
                    Err(err) => println!("Request failed: {}", err),
                }
                sleep(Duration::from_millis(10)).await; // Tránh quá tải nhanh
            }
        }));
    }

    for handle in handles {
        handle.await.unwrap();
    }
}
