import { type SuiGrpcClient } from "@mysten/sui/grpc";
import { coinWithBalance, Transaction } from "@mysten/sui/transactions";
import {
  Pool,
  PoolCreated,
  LiquidityAdded,
  LiquidityRemoved,
  Swapped,
} from "./_generated/amm/uniswapV2.js";
import * as uniswapV2 from "./_generated/amm/uniswapV2.js";
import type { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { convertCompilerOptionsFromJson } from "typescript";
import { bcs } from "@mysten/sui/bcs";

export interface AMMConfig {
  client: SuiGrpcClient;
  packageId: string;
  factoryId: string;
  factorySharedVersion: string | number;
  signer: Ed25519Keypair;
}

export interface PoolInfo {
  id: string;
  reserveA: bigint;
  reserveB: bigint;
  lpSupply: bigint;
  feePoints: bigint;
}

export interface PoolBalances {
  reserveA: string;
  reserveB: string;
  lpSupply: string;
}

export class AMM {
  private client: SuiGrpcClient;
  private packageId: string;
  private factoryId: string;
  private factorySharedVersion: string | number;
  private signer: Ed25519Keypair;

  constructor(config: AMMConfig) {
    this.client = config.client;
    this.packageId = config.packageId;
    this.factoryId = config.factoryId;
    this.factorySharedVersion = config.factorySharedVersion;
    this.signer = config.signer;
  }

  async getPoolInfo(
    poolId: string,
    typeArguments: [string, string],
  ): Promise<PoolInfo> {
    const poolData = await Pool.get({
      client: this.client,
      objectId: poolId,
    });

    return {
      id: poolData.json.id,
      reserveA: BigInt(poolData.json.balance_a.value),
      reserveB: BigInt(poolData.json.balance_b.value),
      lpSupply: BigInt(poolData.json.lp_supply.value),
      feePoints: BigInt(poolData.json.fee_points),
    };
  }

  async getPoolBalances(
    poolId: string,
    typeArguments: [string, string],
  ): Promise<PoolBalances> {
    const tx = new Transaction();
    tx.add(
      uniswapV2.poolBalances({
        package: this.packageId,
        typeArguments,
        arguments: [tx.object(poolId)],
      }),
    );

    const result = await this.client.core.simulateTransaction({
      transaction: tx,
      include: {
        commandResults: true,
      },
    });

    console.log({ result });

    const poolBalanceAResults =
      result.commandResults?.[0]?.returnValues?.[0]?.bcs;
    const poolBalanceBResults =
      result.commandResults?.[0]?.returnValues?.[1]?.bcs;
    const poolALPBalanceResults =
      result.commandResults?.[0]?.returnValues?.[2]?.bcs;
    if (
      !poolBalanceAResults ||
      !poolBalanceBResults ||
      !poolALPBalanceResults
    ) {
      throw new Error("Failed to get pool balances");
    }

    return {
      reserveA: bcs.U64.parse(poolBalanceAResults),
      reserveB: bcs.U64.parse(poolBalanceBResults),
      lpSupply: bcs.U64.parse(poolALPBalanceResults),
    };
  }

  async getPoolFees(
    poolId: string,
    typeArguments: [string, string],
  ): Promise<bigint> {
    const tx = new Transaction();
    tx.add(
      uniswapV2.poolFees({
        package: this.packageId,
        typeArguments,
        arguments: [tx.object(poolId)],
      }),
    );

    const result = await this.client.core.simulateTransaction({
      transaction: tx,
      include: {
        commandResults: true,
      },
    });

    const feesResult = result.commandResults?.[0]?.returnValues?.[0]?.bcs;
    if (!feesResult) {
      throw new Error("Failed to get pool fees");
    }

    return BigInt(bcs.U64.parse(feesResult));
  }

  createPool(params: {
    initA: string;
    initB: string;
    typeArguments: [string, string];
  }): Transaction {
    const tx = new Transaction();
    uniswapV2.createPool({
      package: this.packageId,
      arguments: {
        factory: tx.sharedObjectRef({
          objectId: this.factoryId,
          initialSharedVersion: this.factorySharedVersion,
          mutable: true,
        }),
        initA: tx.object(params.initA),
        initB: tx.object(params.initB),
      },
      typeArguments: params.typeArguments,
    })(tx);
    return tx;
  }

  createPoolWithCoins(params: {
    initA: bigint;
    initB: bigint;
    typeArguments: [string, string];
  }): Transaction {
    const tx = new Transaction();
    const coinA = tx.add(
      coinWithBalance({
        type: params.typeArguments[0],
        balance: params.initA,
      }),
    );
    const coinB = tx.add(
      coinWithBalance({
        type: params.typeArguments[1],
        balance: params.initB,
      }),
    );
    const lpCoin = uniswapV2.createPoolWithCoins({
      package: this.packageId,
      arguments: {
        factory: tx.sharedObjectRef({
          objectId: this.factoryId,
          initialSharedVersion: this.factorySharedVersion,
          mutable: true,
        }),
        initA: coinA,
        initB: coinB,
      },
      typeArguments: params.typeArguments,
    })(tx);

    tx.transferObjects([lpCoin], this.signer.toSuiAddress());
    return tx;
  }

  addLiquidity(params: {
    pool: string;
    inputA: string;
    inputB: string;
    minLpOut: number | bigint;
    typeArguments: [string, string];
  }): Transaction {
    const tx = new Transaction();
    uniswapV2.addLiquidity({
      package: this.packageId,
      arguments: {
        pool: tx.object(params.pool),
        inputA: tx.object(params.inputA),
        inputB: tx.object(params.inputB),
        minLpOut: params.minLpOut,
      },
      typeArguments: params.typeArguments,
    })(tx);
    return tx;
  }

  addLiquidityWithCoins(params: {
    pool: string;
    inputA: string;
    inputB: string;
    minLpOut: number | bigint;
    typeArguments: [string, string];
  }): Transaction {
    const tx = new Transaction();
    uniswapV2.addLiquidityWithCoins({
      package: this.packageId,
      arguments: {
        pool: tx.object(params.pool),
        inputA: params.inputA,
        inputB: params.inputB,
        minLpOut: params.minLpOut,
      },
      typeArguments: params.typeArguments,
    })(tx);
    return tx;
  }

  addLiquidityWithCoinsAndTransferToSender(params: {
    pool: string;
    inputA: string;
    inputB: string;
    minLpOut: number | bigint;
    typeArguments: [string, string];
  }): Transaction {
    const tx = new Transaction();
    uniswapV2.addLiquidityWithCoinsAndTransferToSender({
      package: this.packageId,
      arguments: {
        pool: tx.object(params.pool),
        inputA: params.inputA,
        inputB: params.inputB,
        minLpOut: params.minLpOut,
      },
      typeArguments: params.typeArguments,
    })(tx);
    return tx;
  }

  removeLiquidity(params: {
    pool: string;
    lpIn: string;
    minAOut: number | bigint;
    minBOut: number | bigint;
    typeArguments: [string, string];
  }): Transaction {
    const tx = new Transaction();
    uniswapV2.removeLiquidity({
      package: this.packageId,
      arguments: {
        pool: tx.object(params.pool),
        lpIn: tx.object(params.lpIn),
        minAOut: params.minAOut,
        minBOut: params.minBOut,
      },
      typeArguments: params.typeArguments,
    })(tx);
    return tx;
  }

  removeLiquidityWithCoins(params: {
    pool: string;
    lpIn: string;
    minAOut: number | bigint;
    minBOut: number | bigint;
    typeArguments: [string, string];
  }): Transaction {
    const tx = new Transaction();
    uniswapV2.removeLiquidityWithCoins({
      package: this.packageId,
      arguments: {
        pool: tx.object(params.pool),
        lpIn: params.lpIn,
        minAOut: params.minAOut,
        minBOut: params.minBOut,
      },
      typeArguments: params.typeArguments,
    })(tx);
    return tx;
  }

  removeLiquidityWithCoinsAndTransferToSender(params: {
    pool: string;
    lpIn: string;
    minAOut: number | bigint;
    minBOut: number | bigint;
    typeArguments: [string, string];
  }): Transaction {
    const tx = new Transaction();
    uniswapV2.removeLiquidityWithCoinsAndTransferToSender({
      package: this.packageId,
      arguments: {
        pool: tx.object(params.pool),
        lpIn: params.lpIn,
        minAOut: params.minAOut,
        minBOut: params.minBOut,
      },
      typeArguments: params.typeArguments,
    })(tx);
    return tx;
  }

  swapAForB(params: {
    pool: string;
    input: string;
    minOut: number | bigint;
    typeArguments: [string, string];
  }): Transaction {
    const tx = new Transaction();
    uniswapV2.swapAForB({
      package: this.packageId,
      arguments: {
        pool: tx.object(params.pool),
        input: tx.object(params.input),
        minOut: params.minOut,
      },
      typeArguments: params.typeArguments,
    })(tx);
    return tx;
  }

  swapBForA(params: {
    pool: string;
    input: string;
    minOut: number | bigint;
    typeArguments: [string, string];
  }): Transaction {
    const tx = new Transaction();
    uniswapV2.swapBForA({
      package: this.packageId,
      arguments: {
        pool: tx.object(params.pool),
        input: tx.object(params.input),
        minOut: params.minOut,
      },
      typeArguments: params.typeArguments,
    })(tx);
    return tx;
  }

  swapAForBWithCoin(params: {
    pool: string;
    input: string;
    minOut: number | bigint;
    typeArguments: [string, string];
  }): Transaction {
    const tx = new Transaction();
    uniswapV2.swapAForBWithCoin({
      package: this.packageId,
      arguments: {
        pool: tx.object(params.pool),
        input: params.input,
        minOut: params.minOut,
      },
      typeArguments: params.typeArguments,
    })(tx);
    return tx;
  }

  swapBForAWithCoin(params: {
    pool: string;
    input: string;
    minOut: number | bigint;
    typeArguments: [string, string];
  }): Transaction {
    const tx = new Transaction();
    uniswapV2.swapBForAWithCoin({
      package: this.packageId,
      arguments: {
        pool: tx.object(params.pool),
        input: params.input,
        minOut: params.minOut,
      },
      typeArguments: params.typeArguments,
    })(tx);
    return tx;
  }

  public async executeTransaction(
    suiClient: SuiGrpcClient,
    tx: Transaction,
    signer: Ed25519Keypair,
    execute = false,
  ) {
    try {
      tx.setSender(signer.toSuiAddress());
      const txBytes = await tx.build({ client: suiClient });

      console.log({ txBytes });
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
}
