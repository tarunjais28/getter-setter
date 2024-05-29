use super::*;

// /// Function to manage whitelist programs
// pub fn manange_whitelist(
//     ctx: Context<WhitelistUser>,
//     update_type: UpdateType,
//     programs: Vec<Pubkey>,
// ) -> Result<()> {
//     let admins = &ctx.accounts.maintainers.admins;
//     let caller = ctx.accounts.authority.to_account_info().key();

//     // Ensuring authorized sender
//     require!(admins.contains(&caller), CustomError::Unauthorized);

//     let whitelist = &mut ctx.accounts.whitelist;

//     match update_type {
//         UpdateType::Add => {
//             whitelist.add_programs(programs.clone());
//         }
//         UpdateType::Remove => {
//             whitelist.remove_programs(programs.clone());
//         }
//     }

//     // Emit whitelist event
//     emit!(WhitelistEvent {
//         update_type,
//         programs
//     });

//     Ok(())
// }

/// Function to manage whitelist programs
pub fn add_to_whitelist(ctx: Context<AddWhitelist>) -> Result<()> {
    let admins = &ctx.accounts.maintainers.admins;
    let caller = ctx.accounts.authority.to_account_info().key();

    // Ensuring authorized sender
    require!(admins.contains(&caller), CustomError::Unauthorized);

    // let whitelist = &mut ctx.accounts.whitelist;

    // // Emit whitelist event
    // emit!(WhitelistEvent {
    //     update_type,
    //     programs
    // });

    Ok(())
}

/// Function to manage whitelist programs
pub fn remove_from_whitelist(ctx: Context<RemoveWhitelist>) -> Result<()> {
    let admins = &ctx.accounts.maintainers.admins;
    let caller = ctx.accounts.authority.to_account_info().key();

    // Ensuring authorized sender
    require!(admins.contains(&caller), CustomError::Unauthorized);

    // let whitelist = &mut ctx.accounts.whitelist;

    // // Emit whitelist event
    // emit!(WhitelistEvent {
    //     update_type,
    //     programs
    // });

    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct AddWhitelist<'info> {
    #[account(
        seeds = [MAINTAINERS_TAG],
        bump,
    )]
    pub maintainers: Box<Account<'info, Maintainers>>,

    /// CHECK: Whitelist
    #[account(
        init,
        seeds = [WHITELIST_TAG, caller_program.key.as_ref()],
        bump,
        payer = authority,
        space = std::mem::size_of::<WhitelistedPrograms>() + 8,
    )]
    pub whitelists: Box<Account<'info, WhitelistedPrograms>>,

    /// CHECK: Caller Program
    pub caller_program: AccountInfo<'info>,

    /// CHECK: The authority of whitelist
    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct RemoveWhitelist<'info> {
    #[account(
        seeds = [MAINTAINERS_TAG],
        bump,
    )]
    pub maintainers: Box<Account<'info, Maintainers>>,

    /// CHECK: Whitelist
    #[account(
        mut,
        seeds = [WHITELIST_TAG, caller_program.key.as_ref()],
        bump,
        close = authority,
    )]
    pub whitelists: Box<Account<'info, WhitelistedPrograms>>,

    /// CHECK: Caller Program
    pub caller_program: AccountInfo<'info>,

    /// CHECK: The authority of whitelist
    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
