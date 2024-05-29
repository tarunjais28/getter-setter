use crate::{constants::*, instructions::*};
use anchor_lang::prelude::*;

mod constants;
mod instructions;

declare_id!("F5ouJZN14kipjXz2LVbLMVthmMVXLP7U8fnb3CL7Cu7v");

#[program]
pub mod caller {
    use super::*;

    pub fn set_value(ctx: Context<Setter>, value: u64) -> Result<()> {
        instructions::setter(ctx, value)
    }
}
