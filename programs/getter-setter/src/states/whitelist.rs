use super::*;

#[account]
#[derive(Default)]
pub struct WhitelistedPrograms {}

// impl WhitelistedPrograms {
//     pub fn set_program(&mut self, program: Pubkey) {
//         self.programs = vec![program];
//     }

//     pub fn add_programs(&mut self, programs: Vec<Pubkey>) {
//         self.programs.extend(programs);
//         self.programs.sort();
//         self.programs.dedup();
//     }

//     pub fn remove_programs(&mut self, programs: Vec<Pubkey>) {
//         self.programs.retain(|program| !programs.contains(program));
//     }
// }
