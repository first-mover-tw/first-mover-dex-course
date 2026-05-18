import { SuiGrpcClient } from "@mysten/sui/grpc";
import { coinWithBalance, Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { SUI_TYPE_ARG } from "@mysten/sui/utils";
import { AMM } from "./amm";

const TESTNET_BASE_URL = "https://fullnode.testnet.sui.io:443";

const AMM_PACKAGE_ID =
  "0xaa2e8c2018f8c60ed470359db3bf6619fc9fde68b2f60ff62bd094c902881e17";
const JAREK_COIN_TYPE =
  "0x069fb179994efd4504dd9028574840747d27238257f35ac6fe98679ec7d32ccd::jarek::JAREK";
const FACTORY_ID =
  "0xc556466c3b64112ed9172125627c86ca74c5d5c8ba42750a645e93e1b27ca96f";
const POOL_ID =
  "0x033214a1afb679174cf1fd18bb3c96924eb58e4e07127c83c03632db347b00a7";

export function getClient(): SuiGrpcClient {
  return new SuiGrpcClient({
    network: "testnet",
    baseUrl: TESTNET_BASE_URL,
  });
}

export function getSigner(): Ed25519Keypair {
  const privateKey = process.env.SUI_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("SUI_PRIVATE_KEY env var not set");
  }
  return Ed25519Keypair.fromSecretKey(privateKey);
}

async function main() {
  const client = getClient();
  console.log(`using network: ${client.network}`);

  const signer = getSigner();
  console.log(`using signer: ${signer.toSuiAddress()}`);

  const amm = new AMM({
    client,
    packageId: AMM_PACKAGE_ID,
    factoryId: FACTORY_ID,
    factorySharedVersion: 776733367,
    signer,
  });

  const balances = await amm.getPoolBalances(POOL_ID, [
    SUI_TYPE_ARG,
    JAREK_COIN_TYPE,
  ]);
  console.log({ balances });

  const fees = await amm.getPoolFees(POOL_ID, [SUI_TYPE_ARG, JAREK_COIN_TYPE]);
  console.log({ fees });
  // const tx = amm.createPoolWithCoins({
  //   initA: BigInt(10 ** 9),
  //   initB: BigInt(10 ** 6),
  //   typeArguments: [SUI_TYPE_ARG, JAREK_COIN_TYPE],
  // });
  //
  // await amm.executeTransaction(client, tx, signer, false);
}

main().catch(console.error);
