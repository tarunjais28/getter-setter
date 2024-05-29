use super::*;

#[account]
pub struct Storage {
    pub value: u64,
}

impl Storage {
    pub fn set(&mut self, value: u64) {
        self.value = value;
    }

    pub fn get(&self) -> u64 {
        self.value
    }
}
