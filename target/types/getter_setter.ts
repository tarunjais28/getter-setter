/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/getter_setter.json`.
 */
export type GetterSetter = {
  "address": "4rpZYqGe4Fx9bRD6bEWJdNdWxNQ6JVf9kABRLdnE1M2e",
  "metadata": {
    "name": "getterSetter",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addAdminAccounts",
      "discriminator": [
        203,
        88,
        139,
        90,
        215,
        47,
        91,
        1
      ],
      "accounts": [
        {
          "name": "maintainers",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  105,
                  110,
                  116,
                  97,
                  105,
                  110,
                  101,
                  114,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "addresses",
          "type": {
            "vec": "pubkey"
          }
        }
      ]
    },
    {
      "name": "addWhitelist",
      "discriminator": [
        215,
        46,
        143,
        176,
        108,
        113,
        24,
        1
      ],
      "accounts": [
        {
          "name": "maintainers",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  105,
                  110,
                  116,
                  97,
                  105,
                  110,
                  101,
                  114,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "whitelists",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  104,
                  105,
                  116,
                  101,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "callerProgram"
              }
            ]
          }
        },
        {
          "name": "callerProgram"
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "getValue",
      "discriminator": [
        88,
        79,
        40,
        100,
        21,
        74,
        119,
        125
      ],
      "accounts": [
        {
          "name": "storage",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  97,
                  103,
                  101
                ]
              }
            ]
          }
        }
      ],
      "args": [],
      "returns": "u64"
    },
    {
      "name": "init",
      "discriminator": [
        220,
        59,
        207,
        236,
        108,
        250,
        47,
        100
      ],
      "accounts": [
        {
          "name": "maintainers",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  105,
                  110,
                  116,
                  97,
                  105,
                  110,
                  101,
                  114,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "storage",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  97,
                  103,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "value",
          "type": "u64"
        },
        {
          "name": "callerProgram",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "removeAdminAccounts",
      "discriminator": [
        193,
        27,
        150,
        163,
        51,
        177,
        120,
        162
      ],
      "accounts": [
        {
          "name": "maintainers",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  105,
                  110,
                  116,
                  97,
                  105,
                  110,
                  101,
                  114,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "addresses",
          "type": {
            "vec": "pubkey"
          }
        }
      ]
    },
    {
      "name": "removeWhitelist",
      "discriminator": [
        148,
        244,
        73,
        234,
        131,
        55,
        247,
        90
      ],
      "accounts": [
        {
          "name": "maintainers",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  105,
                  110,
                  116,
                  97,
                  105,
                  110,
                  101,
                  114,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "whitelists",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  104,
                  105,
                  116,
                  101,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "callerProgram"
              }
            ]
          }
        },
        {
          "name": "callerProgram"
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
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
          "signer": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  104,
                  105,
                  116,
                  101,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "callerProgram"
              }
            ]
          }
        },
        {
          "name": "storage",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  97,
                  103,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "callerProgram"
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
  "accounts": [
    {
      "name": "maintainers",
      "discriminator": [
        201,
        217,
        234,
        104,
        25,
        149,
        168,
        56
      ]
    },
    {
      "name": "storage",
      "discriminator": [
        209,
        117,
        255,
        185,
        196,
        175,
        68,
        9
      ]
    },
    {
      "name": "whitelistedPrograms",
      "discriminator": [
        38,
        125,
        4,
        166,
        115,
        158,
        198,
        28
      ]
    }
  ],
  "events": [
    {
      "name": "getEvent",
      "discriminator": [
        176,
        23,
        158,
        131,
        96,
        61,
        24,
        178
      ]
    },
    {
      "name": "initEvent",
      "discriminator": [
        224,
        129,
        78,
        87,
        58,
        43,
        94,
        127
      ]
    },
    {
      "name": "setEvent",
      "discriminator": [
        235,
        11,
        12,
        175,
        145,
        107,
        97,
        205
      ]
    },
    {
      "name": "updateAdminsEvent",
      "discriminator": [
        193,
        223,
        75,
        33,
        14,
        18,
        207,
        71
      ]
    },
    {
      "name": "whitelistEvent",
      "discriminator": [
        69,
        134,
        177,
        228,
        216,
        46,
        239,
        8
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "Error: Unauthorized User!"
    }
  ],
  "types": [
    {
      "name": "getEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "initEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": "u64"
          },
          {
            "name": "whitelistedProgram",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "maintainers",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admins",
            "docs": [
              "Admins"
            ],
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "setEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oldValue",
            "type": "u64"
          },
          {
            "name": "newValue",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "storage",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "updateAdminsEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "updateType",
            "type": {
              "defined": {
                "name": "updateType"
              }
            }
          },
          {
            "name": "addresses",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "updateType",
      "docs": [
        "Update Type"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "add"
          },
          {
            "name": "remove"
          }
        ]
      }
    },
    {
      "name": "whitelistEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "updateType",
            "type": {
              "defined": {
                "name": "updateType"
              }
            }
          },
          {
            "name": "programs",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "whitelistedPrograms",
      "type": {
        "kind": "struct",
        "fields": []
      }
    }
  ],
  "constants": [
    {
      "name": "maintainersTag",
      "type": "bytes",
      "value": "[109, 97, 105, 110, 116, 97, 105, 110, 101, 114, 115]"
    },
    {
      "name": "storageTag",
      "type": "bytes",
      "value": "[115, 116, 111, 114, 97, 103, 101]"
    },
    {
      "name": "whitelistTag",
      "type": "bytes",
      "value": "[119, 104, 105, 116, 101, 108, 105, 115, 116]"
    }
  ]
};
