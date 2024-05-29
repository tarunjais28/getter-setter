import * as anchor from "@coral-xyz/anchor";
import { getProvider, getterSetterProgramInterface, callerProgramInterface } from "./solanaService";
import { GetterSetter } from "../target/types/getter_setter";
import { Program } from "@coral-xyz/anchor";
import { BN } from "bn.js";
import {
  AdminAddress,
  MAINTAINERS,
  WHITELIST,
  STORAGE,
} from "./constant";

const { provider }: any = getProvider();
if (!provider) throw new Error("Provider not available");
let getterSetterProgram: any = new anchor.Program(
  getterSetterProgramInterface,
  provider,
) as Program<GetterSetter>;

let callerProgram: any = new anchor.Program(
  callerProgramInterface,
  provider,
) as Program<GetterSetter>;

const [pdaMaintainers] = anchor.web3.PublicKey.findProgramAddressSync(
  [MAINTAINERS],
  getterSetterProgram.programId,
);

const [pdaStorage] = anchor.web3.PublicKey.findProgramAddressSync(
  [STORAGE],
  getterSetterProgram.programId,
);

const [pdaWhitelist] = anchor.web3.PublicKey.findProgramAddressSync(
  [WHITELIST, callerProgram.programId.toBuffer()],
  getterSetterProgram.programId,
);

const initProgram = async () => {
    let value = new BN(100);

    await getterSetterProgram.methods
      .init(value, callerProgram.programId)
      .accounts({
        maintainers: pdaMaintainers,
        storage: pdaStorage,
        whitelist: pdaWhitelist,
        payer: AdminAddress,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
};

const fetchMaintainers = async () => {
  let maintainers = await getterSetterProgram.account.maintainers.fetch(pdaMaintainers);
  console.log(maintainers.admin.toString());
  console.log(maintainers.subAdmins.toString());
};

const set = async () => {
    let value = new BN(200);
    let tx = await getterSetterProgram.methods
      .setValue(value)
      .accounts({
        whitelist: pdaWhitelist,
        storage: pdaStorage,
      })
      .rpc();
  
      console.log(tx);
};

const setWithotherProgram = async () => {
  let value = new BN(500);
  let tx = await callerProgram.methods
    .setValue(value)
    .accounts({
      whitelist: pdaWhitelist,
      storage: pdaStorage,
      getterSetterProgram: getterSetterProgram.programId,
      callerProgram: callerProgram.programId,
    })
    .rpc();
    console.log(tx);
  };

  const addWhitelist = async () => {
    let tx = await getterSetterProgram.methods
      .addWhitelist()
      .accounts({
        maintainers: pdaMaintainers,
        whitelist: pdaWhitelist,
        callerProgram: callerProgram.programId,
        authority: AdminAddress,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
      console.log(tx);
    };

const getBaseKeys = async () => {
  console.log("maintainers", pdaMaintainers.toString());
  console.log("pdaWhitelist", pdaWhitelist.toString());
  console.log("pdaStorage", pdaStorage.toString());
};

const fetchStorage = async () => {
  let storage = await getterSetterProgram.account.storage.fetch(pdaStorage);
  console.log(Number(storage.value));
};

export {
  fetchMaintainers,
  set,
  initProgram,
  fetchStorage,
  getBaseKeys,
  setWithotherProgram,
  addWhitelist,
};
