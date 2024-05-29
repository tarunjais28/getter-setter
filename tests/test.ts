import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BN } from "bn.js";
import { assert } from "chai";
import { Caller } from "../target/types/caller";
import { GetterSetter } from "../target/types/getter_setter";
import { it } from "node:test";

// Create test keypairs
const admin = anchor.web3.Keypair.generate();
const payer = anchor.web3.Keypair.generate();
const user1 = anchor.web3.Keypair.generate();
const user2 = anchor.web3.Keypair.generate();
const program1 = anchor.web3.Keypair.generate();
const program2 = anchor.web3.Keypair.generate();
const vault = anchor.web3.Keypair.generate();

// Constant seeds
const STORAGE = Buffer.from("storage");
const MAINTAINERS = Buffer.from("maintainers");
const WHITELIST = Buffer.from("whitelist");

describe("Tests", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const getterSetterProgram = anchor.workspace
    .GetterSetter as Program<GetterSetter>;
  const callerProgram = anchor.workspace.Caller as Program<Caller>;

  const confirmTransaction = async (tx) => {
    const latestBlockHash = await provider.connection.getLatestBlockhash();

    await provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: tx,
    });
  };

  // Declare PDAs
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

  const set = async (value) => {
    let setValue = await getterSetterProgram.methods
      .setValue(value)
      .accounts({
        whitelist: pdaWhitelist,
        storage: pdaStorage,
        callerProgram: callerProgram.programId,
      })
      .rpc();

    await confirmTransaction(setValue);
  };

  const setWithOtherProgram = async (program, value) => {
    let setValue = await program.methods
      .setValue(value)
      .accounts({
        whitelist: pdaWhitelist,
        storage: pdaStorage,
        getterSetterProgram: getterSetterProgram.programId,
        callerProgram: program.programId,
      })
      .rpc();

    await confirmTransaction(setValue);
  };

  it("Initialize test accounts", async () => {
    // Airdrop sol to the test users
    let adminSol = await provider.connection.requestAirdrop(
      admin.publicKey,
      anchor.web3.LAMPORTS_PER_SOL,
    );
    await confirmTransaction(adminSol);

    let payerSol = await provider.connection.requestAirdrop(
      payer.publicKey,
      anchor.web3.LAMPORTS_PER_SOL,
    );
    await confirmTransaction(payerSol);

    let user1Sol = await provider.connection.requestAirdrop(
      user1.publicKey,
      1000 * anchor.web3.LAMPORTS_PER_SOL,
    );
    await confirmTransaction(user1Sol);

    let user2Sol = await provider.connection.requestAirdrop(
      user2.publicKey,
      anchor.web3.LAMPORTS_PER_SOL,
    );
    await confirmTransaction(user2Sol);

    let vaultSol = await provider.connection.requestAirdrop(
      vault.publicKey,
      anchor.web3.LAMPORTS_PER_SOL,
    );
    await confirmTransaction(vaultSol);
  });

  it("Initialize global account", async () => {
    let value = new BN(0);

    // Test initialize instruction
    let init = await getterSetterProgram.methods
      .init(value, callerProgram.programId)
      .accounts({
        maintainers: pdaMaintainers,
        storage: pdaStorage,
        payer: admin.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([admin])
      .rpc();

    await confirmTransaction(init);

    let maintainers =
      await getterSetterProgram.account.maintainers.fetch(pdaMaintainers);
    assert.isTrue(
      JSON.stringify(maintainers.admins).includes(
        JSON.stringify(admin.publicKey),
      ),
    );

    let storage = await getterSetterProgram.account.storage.fetch(pdaStorage);
    assert.equal(Number(storage.value), Number(value));
  });

  it("Test Setter", async () => {
    let value = new BN(100);
    await set(value);

    // Check the storage after transaction
    let storage = await getterSetterProgram.account.storage.fetch(pdaStorage);
    assert.equal(Number(storage.value), Number(value));
  });

  it("Test add to whitelist", async () => {
    let addWhitelist = await getterSetterProgram.methods
      .addWhitelist()
      .accounts({
        maintainer: pdaMaintainers,
        whitelist: pdaWhitelist,
        callerProgram: callerProgram.programId,
        authority: admin.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([admin])
      .rpc();

    await confirmTransaction(addWhitelist);

  // Check after whitelisting
  let whitelist =
    await getterSetterProgram.account.whitelistedPrograms.fetch(pdaWhitelist);
  console.log(whitelist);
});

  it("Test Setter with whitelisted Program", async () => {
    let value = new BN(200);
    await setWithOtherProgram(callerProgram, value);

    // Check the storage after transaction
    let storage = await getterSetterProgram.account.storage.fetch(pdaStorage);
    assert.equal(Number(storage.value), Number(value));
  });

  it("Test Add Admins", async () => {
    let addSubAdmins = await getterSetterProgram.methods
      .addAdminAccounts([user1.publicKey])
      .accounts({
        maintainers: pdaMaintainers,
        authority: admin.publicKey,
      })
      .signers([admin])
      .rpc();

    await confirmTransaction(addSubAdmins);

    let maintainers =
      await getterSetterProgram.account.maintainers.fetch(pdaMaintainers);
    assert.isTrue(
      JSON.stringify(maintainers.admins).includes(
        JSON.stringify(user1.publicKey),
      ),
    );
  });

  it("Test Remove Admins", async () => {
    let removeSubAdmins = await getterSetterProgram.methods
      .removeAdminAccounts([user1.publicKey])
      .accounts({
        maintainers: pdaMaintainers,
        authority: admin.publicKey,
      })
      .signers([admin])
      .rpc();

    await confirmTransaction(removeSubAdmins);

    let maintainers =
      await getterSetterProgram.account.maintainers.fetch(pdaMaintainers);
    assert.isFalse(
      JSON.stringify(maintainers.admins).includes(
        JSON.stringify(user1.publicKey),
      ),
    );
  });

  it("Test remove from whitelist", async () => {
    let programs = [program1.publicKey, program2.publicKey];
    let updateType = { remove: {} };

    // Check before whitelisting
    let whitelist =
      await getterSetterProgram.account.whitelistedPrograms.fetch(pdaWhitelist);
    assert.equal(whitelist.programs.length, 3);

    await manageWhitelists(updateType, programs);

    // Check after whitelisting
    whitelist =
      await getterSetterProgram.account.whitelistedPrograms.fetch(pdaWhitelist);
    assert.equal(whitelist.programs.length, 1);
    assert.isTrue(
      JSON.stringify(whitelist.programs).includes(
        JSON.stringify(callerProgram.programId),
      ),
    );
    assert.isFalse(
      JSON.stringify(whitelist.programs).includes(
        JSON.stringify(program1.publicKey),
      ),
    );
    assert.isFalse(
      JSON.stringify(whitelist.programs).includes(
        JSON.stringify(program2.publicKey),
      ),
    );
  });
});
