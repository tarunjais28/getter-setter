use super::*;

/// Function to set storage value
pub fn setter(ctx: Context<Setter>, value: u64) -> Result<()> {
    // let whitelist = &ctx.accounts.whitelist;
    let storage = &mut ctx.accounts.storage;
    msg!("whitelist: {:#?}", ctx.accounts.whitelist.to_account_infos());
    msg!("bump: {}", ctx.bumps.whitelist);

    // // Ensuring authorized sender
    // require!(
    //     ctx.program_id.eq(&crate::ID) || whitelist.programs.contains(&ctx.program_id),
    //     CustomError::Unauthorized
    // );
    let old_value = storage.get();

    storage.set(value);

    // Emit set event
    emit!(SetEvent {
        old_value,
        new_value: value
    });

    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct Setter<'info> {
    #[account(
        signer,
        seeds = [WHITELIST_TAG, caller_program.key.as_ref()],
        bump,
    )]
    pub whitelist: Box<Account<'info, WhitelistedPrograms>>,

    #[account(
        mut,
        seeds = [STORAGE_TAG],
        bump,
    )]
    pub storage: Box<Account<'info, Storage>>,

    /// CHECK: Caller Program
    pub caller_program: AccountInfo<'info>,
}
