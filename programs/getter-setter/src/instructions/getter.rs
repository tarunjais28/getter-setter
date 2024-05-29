use super::*;

/// Function to get storage value
pub fn getter(ctx: Context<Getter>) -> Result<u64> {
    let storage = &mut ctx.accounts.storage;

    let value = storage.get();

    storage.set(value);

    // Emit get event
    emit!(GetEvent { value });

    Ok(value)
}

#[derive(Accounts)]
#[instruction()]
pub struct Getter<'info> {
    #[account(
        mut,
        seeds = [STORAGE_TAG],
        bump,
    )]
    pub storage: Box<Account<'info, Storage>>,
}
