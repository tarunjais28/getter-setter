/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/caller.json`.
 */
export type Caller = {
  "address": "F5ouJZN14kipjXz2LVbLMVthmMVXLP7U8fnb3CL7Cu7v",
  "metadata": {
    "name": "caller",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "setValue",
      "discriminator": [
        253,
        214,
        48,
        201,
        100,
        201,
        227,
        219
      ],
      "accounts": [
        {
          "name": "whitelist",
          "writable": true
        },
        {
          "name": "storage",
          "writable": true
        },
        {
          "name": "getterSetterProgram",
          "writable": true
        },
        {
          "name": "callerProgram",
          "address": "F5ouJZN14kipjXz2LVbLMVthmMVXLP7U8fnb3CL7Cu7v"
        }
      ],
      "args": [
        {
          "name": "value",
          "type": "u64"
        }
      ]
    }
  ],
  "constants": [
    {
      "name": "whitelistTag",
      "type": "bytes",
      "value": "[119, 104, 105, 116, 101, 108, 105, 115, 116]"
    }
  ]
};
