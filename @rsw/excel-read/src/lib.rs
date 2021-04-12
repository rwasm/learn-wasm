mod excel;
// mod utils;

use serde_json::Value as JsonV;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;
use web_sys::Blob;

#[macro_use]
extern crate serde_json;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: JsValue);
    #[wasm_bindgen(js_namespace = console)]
    fn error(s: &str);
    fn alert(s: &str);
}

#[wasm_bindgen(start)]
pub fn run() {
    log("wasm start".into());
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, excel_read!");
}

///
/// file: 前端File对象
/// title_row: 标题在第几行 组合标题: [2,3]
/// rows_excluded: 排除多少行数据, 一行, 二行, 三行: [1,2,3]
/// excluded_keyword: 关键字排除: 在单元格中检测到该关键字读取终止
///
#[wasm_bindgen]
pub async fn read_excel_file(
    file: web_sys::File,
    title_row: wasm_bindgen::JsValue,
    rows_excluded: wasm_bindgen::JsValue,
    excluded_keyword: JsValue,
) -> Result<JsValue, JsValue> {
    // 获得标题在第几栏
    let title_row = title_row
        .into_serde::<Vec<usize>>()
        .map_err(|e| JsValue::from(format!("title_row into_serde error: {}", e)))?;

    // 排除第几行数据
    let rows_excluded = rows_excluded
        .into_serde::<Vec<usize>>()
        .map_err(|e| JsValue::from(format!("rows_excluded into_serde error: {}", e)))?;

    // 怱略的关键字
    let excluded_keyword = excluded_keyword.as_string().unwrap_or_default();

    // 解析文件名
    let file_name: String = file.name();
    let file_name = file_name.to_lowercase();

    // 获得文件名后缀
    let suffix = if file_name.ends_with("xls") {
        "xls".to_owned()
    } else if file_name.ends_with("xlsx") {
        "xlsx".to_owned()
    } else {
        Err("当前不是一个excel文件")?
    };

    // 读取文件二进制流
    let buffer: Blob = file.slice()?;
    let buffer: JsValue = JsFuture::from(buffer.array_buffer()).await?;
    let buffer: Vec<u8> = js_sys::Uint8Array::new(&buffer).to_vec();
    // log(buffer.len().to_string().into());

    // 打开excel
    let sheets = calamine::open_workbook_auto_buff(buffer, &suffix)
        .map_err(|e| JsValue::from_str(&format!("Xlsx-error: {:?}", e)))?;

    // 解析excel
    let r = excel::run(sheets, title_row, rows_excluded, excluded_keyword)?;

    // 把json数据转型为Js的数据类型
    // let r =
    //     JsValue::from_serde(&r).map_err(|e| JsValue::from(format!("from_serde error: {}", e)))?;

    // 返回数据
    Ok(r)
}