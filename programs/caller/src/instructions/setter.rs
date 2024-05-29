use super::*;

/// Function to set storage value
pub fn setter(ctx: Context<Setter>, value: u64) -> Result<()> {
    let (_, bump) = Pubkey::find_program_address(
        &[WHITELIST_TAG, crate::ID.as_ref()],
        ctx.accounts.getter_setter_program.key,
    );
    let seeds = &[WHITELIST_TAG, crate::ID.as_ref(), &[bump]];
    let signer = [&seeds[..]];
    msg!("owner: {}", ctx.accounts.whitelist.owner);
    msg!("bump: {}", bump);

    let cpi_program = ctx.accounts.getter_setter_program.to_account_info();
    let cpi_accounts = getter_setter::cpi::accounts::Setter {
        whitelist: ctx.accounts.whitelist.to_account_info(),
        storage: ctx.accounts.storage.to_account_info(),
        caller_program: ctx.accounts.caller_program.to_account_info(),
    };

    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, &signer);
    getter_setter::cpi::set_value(cpi_ctx, value)?;

    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct Setter<'info> {
    /// CHECK: Whitelist Account of getter-setter program
    #[account(mut)]
    pub whitelist: UncheckedAccount<'info>,

    /// CHECK: Storage Account of getter-setter program
    #[account(mut)]
    pub storage: UncheckedAccount<'info>,

    /// CHECK: Getter Setter Program Id
    #[account(mut)]
    pub getter_setter_program: UncheckedAccount<'info>,

    /// CHECK: Getter Setter Program Id
    #[account(address = crate::ID)]
    pub caller_program: AccountInfo<'info>,
}
