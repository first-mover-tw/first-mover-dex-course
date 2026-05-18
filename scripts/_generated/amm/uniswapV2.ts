/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction, type TransactionArgument } from '@mysten/sui/transactions';
import * as type_name from './deps/std/type_name.js';
import * as balance from './deps/sui/balance.js';
import * as table from './deps/sui/table.js';
const $moduleName = '@local-pkg/amm::uniswapV2';
export const PoolCreated = new MoveStruct({ name: `${$moduleName}::PoolCreated`, fields: {
        pool_id: bcs.Address,
        a: type_name.TypeName,
        b: type_name.TypeName,
        init_a: bcs.u64(),
        init_b: bcs.u64(),
        lp_minted: bcs.u64()
    } });
export const LiquidityAdded = new MoveStruct({ name: `${$moduleName}::LiquidityAdded`, fields: {
        pool_id: bcs.Address,
        a: type_name.TypeName,
        b: type_name.TypeName,
        amountin_a: bcs.u64(),
        amountin_b: bcs.u64(),
        lp_minted: bcs.u64()
    } });
export const LiquidityRemoved = new MoveStruct({ name: `${$moduleName}::LiquidityRemoved`, fields: {
        pool_id: bcs.Address,
        a: type_name.TypeName,
        b: type_name.TypeName,
        amountout_a: bcs.u64(),
        amountout_b: bcs.u64(),
        lp_burnt: bcs.u64()
    } });
export const Swapped = new MoveStruct({ name: `${$moduleName}::Swapped`, fields: {
        pool_id: bcs.Address,
        tokenin: type_name.TypeName,
        amountin: bcs.u64(),
        tokenout: type_name.TypeName,
        amountout: bcs.u64()
    } });
export const LP = new MoveStruct({ name: `${$moduleName}::LP<phantom A, phantom B>`, fields: {
        dummy_field: bcs.bool()
    } });
export const Pool = new MoveStruct({ name: `${$moduleName}::Pool<phantom A, phantom B>`, fields: {
        id: bcs.Address,
        balance_a: balance.Balance,
        balance_b: balance.Balance,
        lp_supply: balance.Supply,
        /** Fees for liquidity provider expressed in points (30 point is 0.3%) */
        fee_points: bcs.u64()
    } });
export const Factory = new MoveStruct({ name: `${$moduleName}::Factory`, fields: {
        id: bcs.Address,
        table: table.Table
    } });
export const PoolItem = new MoveStruct({ name: `${$moduleName}::PoolItem`, fields: {
        a: type_name.TypeName,
        b: type_name.TypeName
    } });
export interface PoolBalancesArguments {
    pool: RawTransactionArgument<string>;
}
export interface PoolBalancesOptions {
    package?: string;
    arguments: PoolBalancesArguments | [
        pool: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function poolBalances(options: PoolBalancesOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["pool"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'pool_balances',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface PoolFeesArguments {
    pool: RawTransactionArgument<string>;
}
export interface PoolFeesOptions {
    package?: string;
    arguments: PoolFeesArguments | [
        pool: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function poolFees(options: PoolFeesOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["pool"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'pool_fees',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface CmpTypeNamesArguments {
    a: TransactionArgument;
    b: TransactionArgument;
}
export interface CmpTypeNamesOptions {
    package?: string;
    arguments: CmpTypeNamesArguments | [
        a: TransactionArgument,
        b: TransactionArgument
    ];
}
export function cmpTypeNames(options: CmpTypeNamesOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["a", "b"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'cmp_type_names',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface CreatePoolArguments {
    factory: RawTransactionArgument<string>;
    initA: TransactionArgument;
    initB: TransactionArgument;
}
export interface CreatePoolOptions {
    package?: string;
    arguments: CreatePoolArguments | [
        factory: RawTransactionArgument<string>,
        initA: TransactionArgument,
        initB: TransactionArgument
    ];
    typeArguments: [
        string,
        string
    ];
}
export function createPool(options: CreatePoolOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null,
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["factory", "initA", "initB"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'create_pool',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AddLiquidityArguments {
    pool: RawTransactionArgument<string>;
    inputA: TransactionArgument;
    inputB: TransactionArgument;
    minLpOut: RawTransactionArgument<number | bigint>;
}
export interface AddLiquidityOptions {
    package?: string;
    arguments: AddLiquidityArguments | [
        pool: RawTransactionArgument<string>,
        inputA: TransactionArgument,
        inputB: TransactionArgument,
        minLpOut: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function addLiquidity(options: AddLiquidityOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null,
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["pool", "inputA", "inputB", "minLpOut"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'add_liquidity',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RemoveLiquidityArguments {
    pool: RawTransactionArgument<string>;
    lpIn: TransactionArgument;
    minAOut: RawTransactionArgument<number | bigint>;
    minBOut: RawTransactionArgument<number | bigint>;
}
export interface RemoveLiquidityOptions {
    package?: string;
    arguments: RemoveLiquidityArguments | [
        pool: RawTransactionArgument<string>,
        lpIn: TransactionArgument,
        minAOut: RawTransactionArgument<number | bigint>,
        minBOut: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function removeLiquidity(options: RemoveLiquidityOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null,
        null,
        'u64',
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["pool", "lpIn", "minAOut", "minBOut"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'remove_liquidity',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SwapAForBArguments {
    pool: RawTransactionArgument<string>;
    input: TransactionArgument;
    minOut: RawTransactionArgument<number | bigint>;
}
export interface SwapAForBOptions {
    package?: string;
    arguments: SwapAForBArguments | [
        pool: RawTransactionArgument<string>,
        input: TransactionArgument,
        minOut: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function swapAForB(options: SwapAForBOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["pool", "input", "minOut"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'swap_a_for_b',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SwapBForAArguments {
    pool: RawTransactionArgument<string>;
    input: TransactionArgument;
    minOut: RawTransactionArgument<number | bigint>;
}
export interface SwapBForAOptions {
    package?: string;
    arguments: SwapBForAArguments | [
        pool: RawTransactionArgument<string>,
        input: TransactionArgument,
        minOut: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function swapBForA(options: SwapBForAOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["pool", "input", "minOut"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'swap_b_for_a',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface CreatePoolWithCoinsArguments {
    factory: RawTransactionArgument<string>;
    initA: RawTransactionArgument<string>;
    initB: RawTransactionArgument<string>;
}
export interface CreatePoolWithCoinsOptions {
    package?: string;
    arguments: CreatePoolWithCoinsArguments | [
        factory: RawTransactionArgument<string>,
        initA: RawTransactionArgument<string>,
        initB: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function createPoolWithCoins(options: CreatePoolWithCoinsOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null,
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["factory", "initA", "initB"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'create_pool_with_coins',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AddLiquidityWithCoinsArguments {
    pool: RawTransactionArgument<string>;
    inputA: RawTransactionArgument<string>;
    inputB: RawTransactionArgument<string>;
    minLpOut: RawTransactionArgument<number | bigint>;
}
export interface AddLiquidityWithCoinsOptions {
    package?: string;
    arguments: AddLiquidityWithCoinsArguments | [
        pool: RawTransactionArgument<string>,
        inputA: RawTransactionArgument<string>,
        inputB: RawTransactionArgument<string>,
        minLpOut: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function addLiquidityWithCoins(options: AddLiquidityWithCoinsOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null,
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["pool", "inputA", "inputB", "minLpOut"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'add_liquidity_with_coins',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AddLiquidityWithCoinsAndTransferToSenderArguments {
    pool: RawTransactionArgument<string>;
    inputA: RawTransactionArgument<string>;
    inputB: RawTransactionArgument<string>;
    minLpOut: RawTransactionArgument<number | bigint>;
}
export interface AddLiquidityWithCoinsAndTransferToSenderOptions {
    package?: string;
    arguments: AddLiquidityWithCoinsAndTransferToSenderArguments | [
        pool: RawTransactionArgument<string>,
        inputA: RawTransactionArgument<string>,
        inputB: RawTransactionArgument<string>,
        minLpOut: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function addLiquidityWithCoinsAndTransferToSender(options: AddLiquidityWithCoinsAndTransferToSenderOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null,
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["pool", "inputA", "inputB", "minLpOut"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'add_liquidity_with_coins_and_transfer_to_sender',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RemoveLiquidityWithCoinsArguments {
    pool: RawTransactionArgument<string>;
    lpIn: RawTransactionArgument<string>;
    minAOut: RawTransactionArgument<number | bigint>;
    minBOut: RawTransactionArgument<number | bigint>;
}
export interface RemoveLiquidityWithCoinsOptions {
    package?: string;
    arguments: RemoveLiquidityWithCoinsArguments | [
        pool: RawTransactionArgument<string>,
        lpIn: RawTransactionArgument<string>,
        minAOut: RawTransactionArgument<number | bigint>,
        minBOut: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function removeLiquidityWithCoins(options: RemoveLiquidityWithCoinsOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null,
        null,
        'u64',
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["pool", "lpIn", "minAOut", "minBOut"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'remove_liquidity_with_coins',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RemoveLiquidityWithCoinsAndTransferToSenderArguments {
    pool: RawTransactionArgument<string>;
    lpIn: RawTransactionArgument<string>;
    minAOut: RawTransactionArgument<number | bigint>;
    minBOut: RawTransactionArgument<number | bigint>;
}
export interface RemoveLiquidityWithCoinsAndTransferToSenderOptions {
    package?: string;
    arguments: RemoveLiquidityWithCoinsAndTransferToSenderArguments | [
        pool: RawTransactionArgument<string>,
        lpIn: RawTransactionArgument<string>,
        minAOut: RawTransactionArgument<number | bigint>,
        minBOut: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function removeLiquidityWithCoinsAndTransferToSender(options: RemoveLiquidityWithCoinsAndTransferToSenderOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null,
        null,
        'u64',
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["pool", "lpIn", "minAOut", "minBOut"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'remove_liquidity_with_coins_and_transfer_to_sender',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SwapAForBWithCoinArguments {
    pool: RawTransactionArgument<string>;
    input: RawTransactionArgument<string>;
    minOut: RawTransactionArgument<number | bigint>;
}
export interface SwapAForBWithCoinOptions {
    package?: string;
    arguments: SwapAForBWithCoinArguments | [
        pool: RawTransactionArgument<string>,
        input: RawTransactionArgument<string>,
        minOut: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function swapAForBWithCoin(options: SwapAForBWithCoinOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["pool", "input", "minOut"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'swap_a_for_b_with_coin',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface SwapBForAWithCoinArguments {
    pool: RawTransactionArgument<string>;
    input: RawTransactionArgument<string>;
    minOut: RawTransactionArgument<number | bigint>;
}
export interface SwapBForAWithCoinOptions {
    package?: string;
    arguments: SwapBForAWithCoinArguments | [
        pool: RawTransactionArgument<string>,
        input: RawTransactionArgument<string>,
        minOut: RawTransactionArgument<number | bigint>
    ];
    typeArguments: [
        string,
        string
    ];
}
export function swapBForAWithCoin(options: SwapBForAWithCoinOptions) {
    const packageAddress = options.package ?? '@local-pkg/amm';
    const argumentsTypes = [
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["pool", "input", "minOut"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'uniswapV2',
        function: 'swap_b_for_a_with_coin',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}