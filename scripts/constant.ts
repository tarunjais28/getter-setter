import { PublicKey } from "@solana/web3.js";

export const GETTER_SETTER_PROGRAM_ID: string =
  "4rpZYqGe4Fx9bRD6bEWJdNdWxNQ6JVf9kABRLdnE1M2e";

export const CALLER_PROGRAM_ID: string =
  "F5ouJZN14kipjXz2LVbLMVthmMVXLP7U8fnb3CL7Cu7v";

  export const CALLER_2_PROGRAM_ID: string =
  "F5ouJZN14kipjXz2LVbLMVthmMVXLP7U8fnb3CL7Cu7v";

export const AdminAddress: PublicKey = new PublicKey(
  "FDFAEes1Tc4WbZeD6aJ25VHPUiUJVFDzUW3abiDRKmXD",
);

export const STORAGE = Buffer.from("storage");
export const MAINTAINERS = Buffer.from("maintainers");
export const WHITELIST = Buffer.from("whitelist");
