// https://rustwasm.github.io/docs/book/game-of-life/hello-world.html

extern crate js_sys;
use wasm_bindgen::prelude::*;
use fixedbitset::FixedBitSet;

// 定义细胞Cell
#[wasm_bindgen]
#[repr(u8)] // 将每个细胞表示为单个字节
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell { // 细胞
    // Dead为0，Alive为1，方便计算一个细胞的存活邻居
    Alive = 1, // 存活: ◼
    Dead = 0, // 死亡: ◻
}

// 定义宇宙Universe
#[wasm_bindgen]
pub struct Universe {
    width: u32, // 宇宙宽度
    height: u32, // 宇宙高度
    cells: FixedBitSet, // 宇宙内的细胞集合
}

impl Universe {
    // 获取给定行列处的细胞索引
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    // 为了计算细胞的下一个状态
    // 需要先获得一个还有多少邻居存活的计数
    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;
        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (column + delta_col) % self.width;
                let idx = self.get_index(neighbor_row, neighbor_col);
                count += self.cells[idx] as u8;
            }
        }

        count
    }
}

// 将方法作为公共方法，导出给JavaScript调用
#[wasm_bindgen]
impl Universe {
    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbor = self.live_neighbor_count(row, col);

                next.set(idx, match (cell, live_neighbor) {
                    // 规则1：模拟生命数量稀少
                    // 当前细胞为存活状态时，当周围的存活细胞低于2个时（不包含2个），该细胞变成死亡状态。
                    (true, x) if x < 2 => false,
                    // 规则2：
                    // 当前细胞为存活状态时，当周围有2个或3个存活细胞时，该细胞保持原样。
                    (true, 2) | (true, 3) => true,
                    // 规则3：模拟生命数量过多
                    // 当前细胞为存活状态时，当周围有超过3个存活细胞时，该细胞变成死亡状态。
                    (true, x) if x > 3 => false,
                    // 规则4：模拟繁殖
                    // 当前细胞为死亡状态时，当周围有3个存活细胞时，该细胞变成存活状态。
                    (false, 3) => true,
                    // 其他细胞保持原状态
                    (otherwise, _) => otherwise,
                });
            }
        }

        self.cells = next;
    }

    // 初始化存活及死亡细胞
    pub fn new() -> Universe {
        let width = 64;
        let height = 64;

        let size = (width * height) as usize;
        let mut cells = FixedBitSet::with_capacity(size);

        for i in 0..size {
            // cells.set(i, i % 2 == 0 || i % 7 == 0);
            // 每个细胞50%概率随机存活
            cells.set(i, js_sys::Math::random() < 0.5);
        }

        Universe {
            width,
            height,
            cells,
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn cells(&self) -> *const u32 {
        self.cells.as_slice().as_ptr()
    }

    // // 文本渲染
    // pub fn render(&self) -> String {
    //     self.to_string()
    // }

}

// 宇宙的状态被表示为细胞的向量
// 为了使人可读，让我们实现一个基本的文本渲染器
// 并为每个细胞打印“Unicode”字符
// 存活打印“◼”，死亡打印“◻”
// impl fmt::Display for Universe {
//     fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//         for line in self.cells.as_slice().chunks(self.width as usize) {
//             for &cell in line {
//                 let symbol = if cell == Cell::Dead { '◻' } else { '◼' };
//                 write!(f, "{}", symbol)?;
//             }

//             write!(f, "\n")?;
//         }

//         Ok(())
//     }
// }
