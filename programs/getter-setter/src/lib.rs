use crate::{constants::*, enums::*, errors::*, events::*, instructions::*, states::*};
use anchor_lang::prelude::*;

mod constants;
mod enums;
mod errors;
mod events;
mod instructions;
mod states;

declare_id!("4rpZYqGe4Fx9bRD6bEWJdNdWxNQ6JVf9kABRLdnE1M2e");

#[program]
pub mod getter_setter {
    use super::*;

    pub fn init(ctx: Context<Initialize>, value: u64, caller_program: Pubkey) -> Result<()> {
        instructions::initialize(ctx, value, caller_program)
    }

    pub fn add_admin_accounts(ctx: Context<UpdateAdmins>, addresses: Vec<Pubkey>) -> Result<()> {
        instructions::add_admins(ctx, addresses)
    }

    pub fn remove_admin_accounts(ctx: Context<UpdateAdmins>, addresses: Vec<Pubkey>) -> Result<()> {
        instructions::remove_admins(ctx, addresses)
    }

    pub fn add_whitelist(ctx: Context<AddWhitelist>) -> Result<()> {
        instructions::add_to_whitelist(ctx)
    }

    pub fn remove_whitelist(ctx: Context<RemoveWhitelist>) -> Result<()> {
        instructions::remove_from_whitelist(ctx)
    }

    pub fn set_value(ctx: Context<Setter>, value: u64) -> Result<()> {
        instructions::setter(ctx, value)
    }

    pub fn get_value(ctx: Context<Getter>) -> Result<u64> {
        instructions::getter(ctx)
    }
}
