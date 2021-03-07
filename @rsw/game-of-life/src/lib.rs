// https://rustwasm.github.io/docs/book/game-of-life/hello-world.html

use std::fmt;
use wasm_bindgen::prelude::*;

// 定义单元格Cell
#[wasm_bindgen]
#[repr(u8)] // 将每个单元格表示为单个字节
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell { // 单元格
    // Dead为0，Alive为1，方便计算一个单元格的存活邻居
    Alive = 1, // 存活: ◼
    Dead = 0, // 死亡: ◻
}

// 定义宇宙Universe
#[wasm_bindgen]
pub struct Universe {
    width: u32, // 宇宙宽度
    height: u32, // 宇宙高度
    cells: Vec<Cell>, // 宇宙内的单元格集合
}

impl Universe {
    // 获取给定行列处的单元格索引
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }
    // 为了计算单元格的下一个状态
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

// 已经拥有从当前一代计算下一代所需的一切
// 游戏的每个规则都遵循直接转换为比赛表达条件的条件
// 由于我们希望JavaScript控制何时发生滴答(tick)
// 所以将方法作为公共方法，导出给JavaScript调用
#[wasm_bindgen]
impl Universe {
    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbor = self.live_neighbor_count(row, col);

                let next_cell = match (cell, live_neighbor) {
                    // 规则1：模拟生命数量稀少
                    // 当前细胞为存活状态时，当周围的存活细胞低于2个时（不包含2个），该细胞变成死亡状态。
                    (Cell::Alive, x) if x < 2 => Cell::Dead,
                    // 规则2：
                    // 当前细胞为存活状态时，当周围有2个或3个存活细胞时，该细胞保持原样。
                    (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive,
                    // 规则3：模拟生命数量过多
                    // 当前细胞为存活状态时，当周围有超过3个存活细胞时，该细胞变成死亡状态。
                    (Cell::Alive, x) if x > 3 => Cell::Dead,
                    // 规则4：模拟繁殖
                    // 当前细胞为死亡状态时，当周围有3个存活细胞时，该细胞变成存活状态。
                    (Cell::Dead, 3) => Cell::Alive,
                    // 其他单元格保持原状态
                    (otherwise, _) => otherwise,
                };

                next[idx] = next_cell;
            }
        }

        self.cells = next;
    }

    // 初始化存活及死亡单元格
    pub fn new() -> Universe {
        let width = 64;
        let height = 64;

        let cells = (0..width * height)
            .map(|i| {
                if i % 2 == 0 || i % 7 == 0 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();

        Universe {
            width,
            height,
            cells,
        }
    }

    // 文本渲染器
    pub fn render(&self) -> String {
        self.to_string()
    }
}

// 宇宙的状态被表示为单元格的向量
// 为了使人可读，让我们实现一个基本的文本渲染器
// 并为每个单元格打印“Unicode”字符
// 存活打印“◼”。死亡打印“◻”
impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell == Cell::Dead { '◻' } else { '◼' };
                write!(f, "{}", symbol)?;
            }

            write!(f, "\n")?;
        }

        Ok(())
    }
}
