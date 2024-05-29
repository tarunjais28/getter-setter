use super::*;

#[event]
pub struct InitEvent {
    pub value: u64,
    pub whitelisted_program: Pubkey,
}

#[event]
pub struct WhitelistEvent {
    pub update_type: UpdateType,
    pub programs: Vec<Pubkey>,
}

#[event]
pub struct UpdateAdminsEvent {
    pub update_type: UpdateType,
    pub addresses: Vec<Pubkey>,
}

#[event]
pub struct SetEvent {
    pub old_value: u64,
    pub new_value: u64,
}

#[event]
pub struct GetEvent {
    pub value: u64,
}
