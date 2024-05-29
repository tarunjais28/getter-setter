use super::*;

/// Function to add admins
pub fn add_admins(ctx: Context<UpdateAdmins>, addresses: Vec<Pubkey>) -> Result<()> {
    let caller = ctx.accounts.authority.to_account_info().key();
    let maintainers = &mut ctx.accounts.maintainers;

    // Ensuring authorized sender
    require!(
        maintainers.admins.contains(&caller),
        CustomError::Unauthorized
    );

    maintainers.add_admins(addresses.clone());

    // Emit add admins event
    emit!(UpdateAdminsEvent {
        update_type: UpdateType::Add,
        addresses
    });

    Ok(())
}

/// Function to remove admins
pub fn remove_admins(ctx: Context<UpdateAdmins>, addresses: Vec<Pubkey>) -> Result<()> {
    let caller = ctx.accounts.authority.to_account_info().key();
    let maintainers = &mut ctx.accounts.maintainers;

    // Ensuring authorized sender
    require!(
        maintainers.admins.contains(&caller),
        CustomError::Unauthorized
    );
    maintainers.remove_admins(addresses.clone());

    // Emit remove admins event
    emit!(UpdateAdminsEvent {
        update_type: UpdateType::Remove,
        addresses
    });

    Ok(())
}

#[derive(Accounts)]
#[instruction(addresses: Vec<Pubkey>)]
pub struct UpdateAdmins<'info> {
    #[account(
        mut,
        seeds = [MAINTAINERS_TAG],
        bump,
        realloc = std::mem::size_of::<Maintainers>() + ((addresses.len() + maintainers.admins.len()) * 32),
        realloc::payer = authority,
        realloc::zero = false,
    )]
    pub maintainers: Box<Account<'info, Maintainers>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
