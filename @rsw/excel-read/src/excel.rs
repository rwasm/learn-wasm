use crate::JsonV;
use calamine::{Reader, Sheets};
use wasm_bindgen::JsValue;

/// sheets: excel对象
/// title_row: 标题在多少行
/// rows_excluded: 数据排除多少行
pub fn run(
    mut sheets: Sheets,
    title_row: Vec<usize>,
    rows_excluded: Vec<usize>,
    excluded_keyword: String,
) -> Result<JsonV, JsValue> {
    let sheet_names = sheets.sheet_names().to_vec();
    let mut r = serde_json::Map::new();
    for name in &sheet_names {
        let mut r_arr = vec![];
        let mut titles = vec![];

        #[allow(unused_assignments)]
        let mut tt: Vec<JsonV> = vec![];

        let sheet = match sheets.worksheet_range(name) {
            Some(Ok(v)) => v,
            e => Err(format!("sheet_name[{}]有误: {:?}", name, e))?,
        };

        // 处理标题
        {
            // 获得所有标题
            let mut row_count = 1_usize;
            for row in sheet.rows() {
                if title_row.contains(&row_count) {
                    let mut titles2 = vec![];
                    for i in 0..row.len() {
                        let item = &row[i];
                        let v = item.get_string().unwrap_or_default();
                        if v.trim() != "" {
                            titles2.push(JsonV::String(v.to_string()));
                        } else {
                            titles2.push(JsonV::Null);
                        }
                    }
                    titles.push(titles2);
                }
                row_count += 1;
            }

            if titles.len() > 0 {
                tt = titles[titles.len() - 1].clone();
            } else {
                continue;
            }

            // 行数
            let row_num = titles.len();

            // 把值往下掉
            for i in 1..row_num {
                for j in 0..titles[i].len() {
                    if titles[i][j].is_null() && !titles[i - 1][j].is_null() {
                        titles[i][j] = titles[i - 1][j].clone();
                    }
                }
            }

            // 列数
            let col_num = titles[titles.len() - 1].len();

            // crate::log(format!("tt: {:?}", tt).into());

            // 查找
            let mut find = |col_i: usize| {
                // 往上面的循环: 标题
                for row_ii in (0..row_num - 1).rev() {
                    // 往左循环: 列
                    for col_ii in (0..=col_i).rev() {
                        let v = titles[row_ii][col_ii].as_str().unwrap_or_default();
                        if v != "" {
                            let t = tt[col_i].as_str().unwrap_or_default().to_string();
                            tt[col_i] = if t == "" || t == v {
                                json!(v)
                            } else {
                                json!(format!("{}:{}", v, t))
                            };
                            break;
                        }
                    }
                }
            };

            // 循环列索引
            for col_i in 0..col_num {
                find(col_i);
            }
        }

        // 处理数据
        let rows = sheet.rows();
        let mut row_i = 0_usize;

        // 循环每一行数据
        'lable: for row in rows {
            row_i += 1;

            if title_row.contains(&row_i) || rows_excluded.contains(&row_i) {
                continue;
            }

            let mut have_data = false;
            let mut m = serde_json::Map::new();

            // 循环每一列数据
            for i in 0..tt.len() {
                let mut v = row
                    .get(i)
                    .map(|v| match v {
                        calamine::DataType::Float(v) => json!(v),
                        calamine::DataType::Int(v) => json!(v),
                        v => json!(v.to_string()),
                    })
                    .unwrap_or(JsonV::Null);
                if let JsonV::String(v2) = v.clone() {
                    if v2.replace(' ', "") == excluded_keyword {
                        break 'lable;
                    }
                    if v2.trim() == "" {
                        v = JsonV::Null;
                    }
                }

                if v != JsonV::Null {
                    have_data = true;
                }

                m.insert(tt[i].as_str().unwrap_or_default().to_string(), v);
            }
            if !have_data {
                break 'lable;
            }

            r_arr.push(m);
        }
        r.insert(name.to_string(), json!(r_arr));
    }
    Ok(json!(r))
}