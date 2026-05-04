import { SuiGrpcClient } from "@mysten/sui/grpc";
import { coinWithBalance, Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { SUI_TYPE_ARG } from "@mysten/sui/utils";

const TESTNET_BASE_URL = "https://fullnode.testnet.sui.io:443";

const AMM_PACKAGE_ID =
  "0xaa2e8c2018f8c60ed470359db3bf6619fc9fde68b2f60ff62bd094c902881e17";
const JAREK_COIN_TYPE =
  "0x069fb179994efd4504dd9028574840747d27238257f35ac6fe98679ec7d32ccd::jarek::JAREK";
const FACTORY_ID =
  "0xc556466c3b64112ed9172125627c86ca74c5d5c8ba42750a645e93e1b27ca96f";

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

export async function executeTransaction(
  suiClient: SuiGrpcClient,
  tx: Transaction,
  signer: Ed25519Keypair,
  execute = false,
) {
  try {
    tx.setSender(signer.toSuiAddress());
    const txBytes = await tx.build({ client: suiClient });

    const dryRunResponse = await suiClient.core.simulateTransaction({
      transaction: txBytes,
      include: {
        effects: true,
      },
    });
    if (!dryRunResponse.Transaction?.effects.status.success) {
      console.error("DryRun fail");
      console.error({ dryRunResponse });
      throw new Error(`Dry run failed: ${dryRunResponse.FailedTransaction}`);
    }

    console.log("DryRun successfully");

    if (execute) {
      const res = await suiClient.signAndExecuteTransaction({
        transaction: tx,
        signer,
        include: { effects: true },
      });
      console.log(`Execution Success: ${res.Transaction?.digest}`);
    }
  } catch (error) {
    console.error("Transaction Error:", error);
  }
}

export function buildCreatePoolWithCoins(params: {
  coinAType: string;
  coinBType: string;
  coinAAmount: bigint;
  coinBAmount: bigint;
}): Transaction {
  const tx = new Transaction();

  const sender = getSigner().toSuiAddress();
  tx.setSender(sender);

  // retrieve coins
  const coinA = coinWithBalance({
    type: params.coinAType,
    balance: params.coinAAmount,
    useGasCoin: params.coinAType === SUI_TYPE_ARG,
  });
  const coinB = coinWithBalance({
    type: params.coinBType,
    balance: params.coinBAmount,
    useGasCoin: params.coinAType === SUI_TYPE_ARG,
  });
  const [lpCoin] = tx.moveCall({
    target: `${AMM_PACKAGE_ID}::uniswapV2::create_pool_with_coins`,
    typeArguments: [params.coinAType, params.coinBType],
    arguments: [
      tx.sharedObjectRef({
        objectId: FACTORY_ID,
        initialSharedVersion: 776733367,
        mutable: true,
      }),
      tx.object(coinA),
      tx.object(coinB),
    ],
  });

  tx.transferObjects([lpCoin!], sender);

  return tx;
}

async function main() {
  const client = getClient();
  console.log(`using network: ${client.network}`);

  const signer = getSigner();
  console.log(`using signer: ${signer.toSuiAddress()}`);

  const tx = buildCreatePoolWithCoins({
    coinAType: SUI_TYPE_ARG,
    coinBType: JAREK_COIN_TYPE,
    coinAAmount: BigInt(10 ** 9),
    coinBAmount: BigInt(10 ** 6),
  });

  await executeTransaction(client, tx, signer, false);
}

main().catch(console.error);
