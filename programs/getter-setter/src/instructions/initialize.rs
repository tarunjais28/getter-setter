use super::*;

/// Function to initialize the contract
pub fn initialize(ctx: Context<Initialize>, value: u64, caller_program: Pubkey) -> Result<()> {
    let caller = ctx.accounts.payer.to_account_info().key();
    let maintainers = &mut ctx.accounts.maintainers;
    maintainers.save(caller);

    let storage = &mut ctx.accounts.storage;
    storage.set(value);

    // Emit init event
    emit!(InitEvent {
        value,
        whitelisted_program: caller_program
    });

    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct Initialize<'info> {
    #[account(
        init,
        seeds = [MAINTAINERS_TAG],
        bump,
        payer = payer,
        space = std::mem::size_of::<Maintainers>() + 32
    )]
    pub maintainers: Box<Account<'info, Maintainers>>,

    #[account(
        init,
        seeds = [STORAGE_TAG],
        bump,
        payer = payer,
        space = std::mem::size_of::<Storage>() + 8
    )]
    pub storage: Box<Account<'info, Storage>>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
