use wasm_bindgen::prelude::*;

// use modules
mod chasm;

// // Import the `window.alert` function from the Web.
// #[wasm_bindgen]
// extern "C" {
//     fn alert(s: &str);

//     // use `js_namespace` here to bind `console.log(...)` instead of just `log(...)`
//     #[wasm_bindgen(js_namespace = console)]
//     fn log(s: &str);

//     // The `console.log` is quite polymorphic, so we can bind it with multiple signatures.
//     // Note that we need to use `js_name` to ensure we always call `log` in js.
//     #[wasm_bindgen(js_namespace = console, js_name = log)]
//     fn log_u32(a: u32);

//     // Multiple arguments too!
//     #[wasm_bindgen(js_namespace = console, js_name = log)]
//     fn log_many(a: &str, b: &str);
// }

// fn bare_bones() {
//     log("Hello from Rust!");
//     log_u32(1024);
//     log_many("a", "b");
// }

// macro_rules! console_log {
//     ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
// }

// fn use_log_macro() {
//     console_log!("Hello {}!", "wasm");
//     console_log!("1+2={}", 1+2);
// }

// fn using_web_sys() {
//     use web_sys::console;

//     console::log_1(&"Hello using web_sys!".into());
//     let val: JsValue = 4.into();
//     console::log_2(&"Logging arbitrary values looks like".into(), &val);
// }

// 初始化执行
#[wasm_bindgen(start)]
pub fn run() {
    // bare_bones();
    // use_log_macro();
    // using_web_sys();
    // chasm::start();
}

// // Export a `greet` function from Rust to JavaScript, that alerts a
// // hello message.
// #[wasm_bindgen]
// pub fn greet(name: &str) {
//     // Ambiguous "unsafe" Error WASM JS alert
//     // settings.json: disable the missing-unsafe rule
//     // @see: https://github.com/rust-analyzer/rust-analyzer/issues/5412
//     alert(&format!("Hello, {}!", name));
// }
